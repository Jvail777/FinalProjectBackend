import cors from 'cors';
import express, { Application } from 'express';
import * as functions from 'firebase-functions';
import { leaderboardrRoutes } from './routes/LeaderboardRoutes';
import { playerRoutes } from './routes/PlayerRoutes';


const app:Application = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/player", playerRoutes)
app.use("/leaderboard", leaderboardrRoutes)

export const api = functions.https.onRequest(app);