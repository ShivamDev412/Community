import db from "../../database/db.config";

const findGroupsByOrganizer = async (organizerId: string, offset: number) => {
  return await db.group.findMany({
    where: {
      organized_by: organizerId,
    },
    select: {
      id:true,
      name: true,
      image: true,
      compressed_image: true,
    },
    orderBy: {
      created_at: "desc",
    },
    skip: offset,
  });
};
const findGroup = async (groupId: string, select?: any) => {
  const queryOptions: { where: { id: string }; select?: any } = {
    where: {
      id: groupId,
    },
  };
  if (select) {
    queryOptions.select = select;
  }
  return await db.group.findUnique(queryOptions);
};
export { findGroupsByOrganizer, findGroup };
