import express, { Application } from 'express';
import * as functions from 'firebase-functions';
import { leaderboardRoutes } from './routes/LeaderboardRoutes';

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/leaderboard", leaderboardRoutes)
export const api = functions.https.onRequest(app);