import express, { Request, Response } from "express";
import { getClient } from "../db";
import Leaderboard from "../models/Leaderboard";
export const leaderboardRoutes = express.Router();

leaderboardRoutes.get("/", async (req: Request, res: Response) => {
    const to = req.query.to as string;

    const mongoQuery: any = {};

    if (to) {
        mongoQuery.to = to;
    }

    try {
        const client = await getClient();
        const results = await client
          .db()
          .collection<Leaderboard>("leaderboard")
          .find(mongoQuery)
          .toArray();
    
        return res.status(200).json(results);
      } catch (error) {
        return res.status(500).send(error);
      }
});

