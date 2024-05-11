import { Request, Response, NextFunction } from "express";
import moment from "moment-timezone";
import { throwError } from "../utils/Error";
import getCity from "../services/GetCity";
import db from "../database/db.config";
import calculateDistance from "../services/CalculateDistance";
import { getImage } from "../services/UploadToS3";
export const SearchByNameAndLocation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { event, city, state } = request.query;
    const userId: string | undefined = request?.user?.id;
    if (!userId) {
      return throwError(next, "User not found");
    }
  } catch (error) {
    next(error);
  }
};
export const GetCityOfUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { lat, lon } = request.body;
    if (lat && lon) {
      const address = await getCity(lat, lon);
      const city = address.find((component: any) =>
        component.types.includes("administrative_area_level_3")
      )?.short_name;
      const state = address.find((component: any) =>
        component.types.includes("administrative_area_level_1")
      )?.short_name;
      const location = {
        city,
        state,
      };
      response.status(200).json(location);
    }
  } catch (error) {
    next(error);
  }
};

export const GetEvents = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request?.user?.id;
    const { query, latitude, longitude, radius, type } = request.query;
    const radiusValue = radius;
    const today = moment().utc().startOf("day");
    let events = await db.event.findMany({
      where: {
        host_id: {
          not: {
            equals: userId,
          },
        },
        event_date: {
          gte: today.toDate(),
        },
        event_end_time: {
          gt: moment.utc().toDate(),
        },
      },
      orderBy: {
        event_date: "asc",
      },
    });
    events = await Promise.all(
      events.map(async (event) => {
        return {
          ...event,
          image: (await getImage(event?.image || "")) as string,
          compressed_image: (await getImage(
            event?.compressed_image || ""
          )) as string,
          group: await db.group.findUnique({
            where: {
              id: event?.group_id,
            },
            select: {
              name: true,
              location: true,
            },
          }),
          members: await db.userEvent.count({
            where: {
              event_id: event?.id,
            },
          }),
        };
      })
    );

    if (typeof query === "string" && query.trim() !== "") {
      const filteredEvents = events.filter((event) => {
        const isQueryInName = event.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const isQueryInDescription = event.details
          ?.toLowerCase()
          .includes(query.toLowerCase());
        return isQueryInName || isQueryInDescription;
      });
      events = filteredEvents;
    }

    if (radiusValue) {
      events = events.filter((event) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          event.latitude as number,
          event.longitude as number
        );
        return distance <= +radiusValue;
      });
    } else if (type === "online") {
      events = events.filter((event) => {
        return event.event_type === type;
      });
    }

    const groupedEvents = events.reduce((acc: any, event) => {
      const eventDate = moment(event.event_date).utc().startOf("day");
      const formattedDate = eventDate.isSame(today, "day")
        ? today.unix()
        : eventDate.unix();
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(event);
      return acc;
    }, {});
    response.status(200).json({
      success: true,
      data: groupedEvents,
    });
  } catch (error) {
    next(error);
  }
};
export const GetAttendingEvents = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const today = moment().utc().startOf("day");
    const userId = request?.user?.id;

    let events = await db.userEvent.findMany({
      where: {
        user_id: userId,
        event: {
          event_date: {
            gte: today.toDate(),
          },
          event_end_time: {
            gt: moment.utc().toDate(),
          },
        },
      },
      select: {
        event: true,
      },
      orderBy: {
        event: {
          event_date: "asc",
        },
      },
    });
    events = await Promise.all(
      events.map(async ({ event }) => {
        return {
          event: {
            ...event,
            image: (await getImage(event?.image || "")) as string,
            compressed_image: (await getImage(
              event?.compressed_image || ""
            )) as string,
            group: await db.group.findUnique({
              where: {
                id: event?.group_id,
              },
              select: {
                name: true,
                location: true,
              },
            }),
            members: await db.userEvent.count({
              where: {
                event_id: event?.id,
              },
            }),
          },
        };
      })
    );
    const eventsToSend = events.map(({ event }) => event);
    response.status(200).json({
      success: true,
      data: eventsToSend,
    });
  } catch (error) {
    next(error);
  }
};
export const HandleSearch = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const searchParams = {
      keyword: (request.query.keyword as string) || "",
      lat: request.query.lat ? parseFloat(request.query.lat as string) : 0,
      lon: request.query.lon ? parseFloat(request.query.lon as string) : 0,
      day: (request.query.day as string) || "",
      type: (request.query.type as string) || "",
      distance: (request.query.distance as string) || "",
      category: (request.query.category as string) || "",
      sortBy: (request.query.sortBy as string) || "date",
      tab: (request.query.tab as string) || "events",
    };
    const userId: string | undefined = request?.user?.id;
    if (!userId) {
      return throwError(next, "User not found");
    }
    let events;
    let groups;
    if (searchParams.tab === "groups") {
      groups = await db.group.findMany({
        select: {
          id: true,
          name: true,
          location: true,
          image: true,
          compressed_image: true,
          about: true,
          latitude: true,
          longitude: true,
          users: {
            select: {
              user_id: true,
              group_id: true,
            },
          },
        },
      });
      if (searchParams.keyword.trim() !== "") {
        groups = groups.filter((group) => {
          const isQueryInName = group.name
            .toLowerCase()
            .includes(searchParams.keyword.toLowerCase());
          const isGroupInDescription = group.about?.includes(
            searchParams.keyword.toLowerCase()
          );
          return isQueryInName || isGroupInDescription;
        });
      }
      if (searchParams.distance) {
        groups = groups.filter((group) => {
          const distance = calculateDistance(
            searchParams.lat,
            searchParams.lon,
            group.latitude as number,
            group.longitude as number
          );
          return distance <= +searchParams.distance;
        });
      }
      groups = await Promise.all(
        groups.map(async (group) => {
          return {
            ...group,
            image: (await getImage(group?.image || "")) as string,
            compressed_image: (await getImage(
              group?.compressed_image || ""
            )) as string,
          };
        })
      );
    } else {
      const today = moment().utc().startOf("day");
      let eventDate: Date | string = today.toDate();
      // * Handle for event date
      switch (searchParams.day) {
        case "today":
          eventDate = today.toDate();
          break;
        case "tomorrow":
          eventDate = today.clone().add(1, "day").format("YYYY-MM-DD");
          break;
        case "this-week":
          eventDate = today.clone().add(7, "day").format("YYYY-MM-DD");
          break;
        case "this-weekend":
          const endOfWeekend = today.clone().endOf("week");
          eventDate = today.clone().add(1, "day").isAfter(endOfWeekend)
            ? endOfWeekend.format("YYYY-MM-DD")
            : today.clone().add(30, "day").format("YYYY-MM-DD");
          break;
        case "next-week":
          eventDate = today.clone().add(7, "day").format("YYYY-MM-DD");
          break;
        default:
          eventDate = today.toDate();
      }
      events = await db.event.findMany({
        where: {
          host_id: {
            not: {
              equals: userId,
            },
          },
          event_date: {
            gte: eventDate,
          },
        },
      });
      // * Handle for event by distance
      if (searchParams.distance) {
        events = events.filter((event) => {
          const distance = calculateDistance(
            searchParams.lat,
            searchParams.lon,
            event.latitude as number,
            event.longitude as number
          );
          return distance <= +searchParams.distance;
        });
      }
      // * Handle for event by type
      if (searchParams.type) {
        events = events.filter((event) => {
          return event.event_type === searchParams.type;
        });
      }
      // * Handle for event by keyword
      if (searchParams.keyword.trim() !== "") {
        const filteredEvents = events.filter((event) => {
          const isQueryInName = event.name
            .toLowerCase()
            .includes(searchParams.keyword.toLowerCase());
          const isQueryInDescription = event.details
            ?.toLowerCase()
            .includes(searchParams.keyword.toLowerCase());
          return isQueryInName || isQueryInDescription;
        });
        events = filteredEvents;
      }
      events = await Promise.all(
        events.map(async (event) => {
          return {
            ...event,
            image: (await getImage(event?.image || "")) as string,
            compressed_image: (await getImage(
              event?.compressed_image || ""
            )) as string,
            group: await db.group.findUnique({
              where: {
                id: event?.group_id,
              },
              select: {
                name: true,
                location: true,
              },
            }),
            members: await db.userEvent.count({
              where: {
                event_id: event?.id,
              },
            }),
          };
        })
      );
    }
    response.status(200).json({
      success: true,
      data: searchParams.tab === "events" ? events : groups,
    });
  } catch (error) {
    next(error);
  }
};
