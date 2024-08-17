import db from "../../database/db.config";

const findCategories = async () => {
  return await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};
export { findCategories };
