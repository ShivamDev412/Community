import { Request, Response } from "express";
import db from "../database/db.config";
const USER1 = "clvbb95jp0003mqj8f8pa9bho";
const USER2 = "clvituuf9000098mrujov3omd";
export const GetAllUsers = async (req: Request, res: Response) => {
  const users = await db.user.findMany();
  res.json(users);
};
export const DeleteUser = async (req: Request, res: Response) => {
  const user = await db.user.delete({
    where: {
      id: USER2,
    },
  });
  res.json(user);
};
export const RemoveRefreshToken = async (req: Request, res: Response) => {
  const user = await db.user.update({
    where: {
      id: USER1,
    },
    data: {
      refresh_token: [],
    },
  });
  res.json(user);
}
export const GetEvents = async (req: Request, res: Response) => {
    const events = await db.event.findMany();
    res.json(events);
}
