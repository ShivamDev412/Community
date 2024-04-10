import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();
const db = new PrismaClient({
  log: ["query"],
  datasources: {
    db: {
      url: "postgresql://shiv41297:jxUa7EWYQm4y@ep-billowing-thunder-a5029b6q.us-east-2.aws.neon.tech/community?sslmode=require",
      
    },
  },

});

export default db;