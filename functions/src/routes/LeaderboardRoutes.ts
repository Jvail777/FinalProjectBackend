import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import Leaderboard from "../models/Leaderboard";

export const leaderboardRoutes = express.Router();

leaderboardRoutes.get("/", async (req: Request, res: Response) => {
  const name = req.query.name as string;

  const mongoQuery: any = {};

  if (name) {
    mongoQuery.name = name;
  }

  try {
    const client = await getClient();
    const results = await client
      .db("backend")
      .collection<Leaderboard>("backend")
      .find(mongoQuery)
      .toArray();

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send(error);
  }
});

leaderboardRoutes.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const client = await getClient();
    const result = await client
      .db("backend")
      .collection<Leaderboard>("backend")
      .findOne({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});
