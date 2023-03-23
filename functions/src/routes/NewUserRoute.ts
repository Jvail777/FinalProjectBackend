import express, { Request, Response } from "express";
import { getClient } from "../db";
import Leaderboard from "../models/Leaderboard"
export const NewUserRoute = express.Router();

NewUserRoute.post("/", async (req:Request, res:Response) => {
    const newUser = req.body as Leaderboard;

    try {
        const client = await getClient();

        await client.db("backend").collection<Leaderboard>("backend").insertOne(newUser);

        return res.status(201).json(newUser);
    }
    catch (error) {
        return res.status(500).send(error);
    }
})