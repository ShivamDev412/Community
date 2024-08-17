import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: [],
});

export default db;
