import express, { Request, Response } from "express";
import { getClient } from "../db";
import Leaderboard from "../models/Player";

export const leaderboardrRoutes = express.Router();

//get leaderboard
leaderboardrRoutes.get("/", async (req: Request, res: Response) => {
    const difficulty = req.query.difficulty as string;
  
    const mongoQuery: any = {};
  
    if(difficulty){
      mongoQuery.difficulty = difficulty;
    }
  
    try{
      const client = await getClient();
      const results = await client
      .db("backend")
      .collection<Leaderboard>("backend")
      .find(mongoQuery)
      .toArray();
  
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).send(error)
    }
  })