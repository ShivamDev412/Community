import db from "../../database/db.config";

const findInterest = (interestId: string) => {
  return db.interest.findUnique({
    where: {
      id: interestId,
    },
  });
};
const findInterestsByIds = async (tagIds: Array<any>) => {
  return await db.interest.findMany({
    where: { id: { in: tagIds } },
  });
};
const findInterestsByCategory = async (categoryId: string) => {
  return await db.interest.findMany({
    where: {
      category_id: categoryId,
    },
    select: {
      id: true,
      name: true,
    },
  });
}
const findInterests = async () => {
  return await db.interest.findMany();
};
export { findInterest, findInterests, findInterestsByIds, findInterestsByCategory };
