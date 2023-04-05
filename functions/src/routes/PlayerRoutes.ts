import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import { Game } from "../models/Game";
import Player from "../models/Player";

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
      .collection<Player>("Player")
      .find(mongoQuery)
      .toArray();

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send(error);
  }
});


//get player by google id
playerRoutes.get("/:id", async (req: Request, res: Response) => {
  const player = req.body.id;

  try {
    const client = await getClient();
    const result = await client
      .db("backend")
      .collection<Player>("Player")
      .findOne({ id: player.id });

    if (!result) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send("this is an error");
  }
});

//add a player
playerRoutes.post("/", async (req: Request, res: Response) => {
  const newPlayer = req.body as Player;

  try {
    const client = await getClient();

    await client
      .db("backend")
      .collection<Player>("Player")
      .insertOne(newPlayer);

    return res.status(201).json(newPlayer);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//update player by id
playerRoutes.put("/:id/:name", async (req: Request, res: Response) => {
  const game = req.body as Game;

  try {
    const client = await getClient();
    //check to see if the player already exists in database
    const playerResult = await client
      .db("backend")
      .collection<Player>("Player")
      .findOne({ googleId: req.params.id });
    //if they exist, add the game from request to their array of
    if (!playerResult) {
      const newPlayerResult = await client
        .db("backend")
        .collection<Player>("Player")
        .insertOne({
          googleId: req.params.id,
          name: req.params.name,
          games: [game],
        });
      return res.status(204).json(newPlayerResult);
    }
    //if they don't exist, add a new player and set their game from the request
    else {
      const updatePlayerResult = await client
        .db("backend")
        .collection<Player>("Player")
        .updateOne(
          { googleId: req.params.id },
          {
            $push: {
              games: {
                category: game.category,
                difficulty: game.difficulty,
                score: game.score,
              },
            },
          }
        );
      return res.status(204).json(updatePlayerResult);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//delete player by id
playerRoutes.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client
      .db("backend")
      .collection<Player>("Player")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Not Found" });
    } else {
      return res.status(204).end();
    }
  } catch (err) {
    console.error("FAIL", err);
    return res.status(500).json({ id });
  }
});
