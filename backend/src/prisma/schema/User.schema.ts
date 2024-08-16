import db from "../../database/db.config";

const finUserByEmail = async (email: string) => {
  return await db.user.findFirst({
    where: {
      email,
    },
  });
};
const createUser = async (data: any) => {
  return await db.user.create({
    data,
  });

}
const findUser = async (userId: string, select?: any) => {
  const queryOptions: { where: { id: string }; select?: any } = {
    where: {
      id: userId,
    },
  };
  if (select) {
    queryOptions.select = select;
  }
  return await db.user.findUnique(queryOptions);
};
const findUserByGoogleId = async (googleId: string) => {
  return await db.user.findFirst({
    where: {
      google_id: googleId,
    },
  });
}

const updateUser = async (userId: string, data: any) => {
  return await db.user.update({
    where: {
      id: userId,
    },
    data,
  });
};
const findUserInterests = async (userId: string) => {
  return await db.userInterest.findMany({
    where: {
      user_id: userId,
    },
    include: {
      interest: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};
const findUserInterest = async (
  userId: string,
  interestId: string,
  include: any
) => {
  return await db.userInterest.findFirst({
    where: {
      user_id: userId,
      interest_id: interestId,
    },
    include,
  });
};
const createNewUserInterest = async (userId: string, interestId: string) => {
  return await db.userInterest.create({
    data: {
      user: {
        connect: { id: userId },
      },
      interest: {
        connect: { id: interestId },
      },
    },
  });
};
const removeUserInterest = async (userId: string, interestId: string) => {
  return await db.userInterest.delete({
    where: {
      user_id_interest_id: {
        user_id: userId,
        interest_id: interestId,
      },
    },
  });
};
const findUserEvents = async (
  userId: string,
  event: any,
  select: any,
  orderBy: any,
  offset: number
) => {
  return await db.userEvent.findMany({
    where: {
      user_id: userId,
      event,
    },
    select,
    orderBy,
    skip: offset,
    take: 10,
  });
};
const cancelEvent = async (userId: string, eventId: string) => {
  return await db.userEvent.delete({
    where: {
      user_id_event_id: {
        user_id: userId,
        event_id: eventId,
      },
    },
  });
};
const registerEvent = async (userId: string, eventId: string) => {
  try {
    const existingRegistration = await db.userEvent.findUnique({
      where: {
        user_id_event_id: {
          user_id: userId,
          event_id: eventId,
        },
      },
    });

    if (existingRegistration) {
      throw new Error('User is already registered for this event.');
    }
    return await db.userEvent.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        event: {
          connect: {
            id: eventId,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export {
  findUser,
  updateUser,
  findUserInterests,
  createNewUserInterest,
  findUserInterest,
  removeUserInterest,
  findUserEvents,
  registerEvent,
  cancelEvent,
  finUserByEmail,
  createUser,
  findUserByGoogleId,
};
