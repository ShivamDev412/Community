import db from "../../database/db.config";

const findEventsOrganizedByUser = async (condition: any, offset: number) => {
  return await db.event.findMany({
    where: condition,
    skip: offset,
    take: 10,
    orderBy: {
      event_date: "desc",
    },
  });
};
const existingEvent = async (condition: any) => {
  return await db.event.findFirst({
    where: condition,
  });
};
const findEvent = async (eventId: string) => {
  return await db.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      tags: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
};
const addEvent = async (data: any) => {
  return await db.event.create({
    data,
  });
};
const updateEventById = async (eventId: string, data: any) => {
  return await db.event.update({
    where: { id: eventId },
    data,
  });
};
const findEventMembers = async (eventId: string) => {
  return await db.userEvent.findMany({
    where: {
      event_id: eventId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
          compressed_image: true,
          id: true,
        },
      },
    },
  });
};
export {
  findEventsOrganizedByUser,
  findEvent,
  addEvent,
  updateEventById,
  existingEvent,
  findEventMembers,
};
