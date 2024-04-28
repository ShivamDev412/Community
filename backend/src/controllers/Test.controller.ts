import { Request, Response } from "express";
import db from "../database/db.config";
export const GetAllUsers = async (req: Request, res: Response) => {
  const users = await db.user.findMany();
  res.json(users);
};
export const DeleteUser = async (req: Request, res: Response) => {
  const user = await db.user.delete({
    where: {
      id: "clvhc1yt40000ddxj9v9f30eh",
    },
  });
  res.json(user);
};
