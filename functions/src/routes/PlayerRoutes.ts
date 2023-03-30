import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import Player from "../models/Player";
import Leaderboard from "../models/Player";

export const playerRoutes = express.Router();

//get list of players
playerRoutes.get("/", async (req: Request, res: Response) => {
  const name = req.query.name as string;

  const mongoQuery: any = {};

  if (name) {
    mongoQuery.name = name;
  }

  try {
    const client = await getClient();
    const results = await client
      .db("backend")
      .collection<Player>("backend")
      .find(mongoQuery)
      .toArray();

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send(error);
  }
});


//get individual player
playerRoutes.get("/:id", async (req: Request, res: Response) => {
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
    return res.status(500).send("this is an error");
  }
});

//add a player
playerRoutes.post("/", async (req:Request, res:Response) => {
  const newPlayer = req.body as Player;

  // const newPlayer = {
  //     name: req.body.name,
  //     score: 0,
  //     difficulty: "easy"
  // }
  
  try {
      const client = await getClient();

      await client.db("backend").collection<Player>("backend").insertOne(newPlayer);

      return res.status(201).json(newPlayer);
  }
  catch (error) {
      return res.status(500).send(error);
  }
});


//update player by id *****************NEEDS WORK*********************
playerRoutes.put("/:id", async (req:Request, res:Response) => {
  // const id = req.params.id;
  const player = req.body as Player;
  // delete player._id;

  try{
      const client = await getClient();
      const result = await client.db("backend").collection<Player>("backend").updateOne({_id: new ObjectId(req.params.id)}, {$push: {games: {"category": req.body.games.category, "difficulty": req.body.games.difficulty, "score": req.body.games.score}}})
      // const result = await client.db("backend").collection<Player>("backend").updateOne({_id: new ObjectId(id)}, player)
    console.log(result)
      if(result.modifiedCount === 0){
          return res.status(404).send("Not found dude");
      } else{
          // player._id = new ObjectId(id);
          player.name = player.name;
          player.id = player.id;
          player.games = player.games
          return res.json(player);
      }
  } catch (error) {
      return res.status(500).json(error);
}});

//delete player by id
playerRoutes.delete("/:id", async (req:Request, res:Response) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client.db("backend").collection<Player>("backend").deleteOne({_id: new ObjectId(id)});
    if (result.deletedCount === 0) {
      return res.status(404).json({message: "Not Found"});
    } else {
      return res.status(204).end();
    }
  } catch (err) {
    console.error("FAIL", err);
    return res.status(500).json({id});
  }
});
