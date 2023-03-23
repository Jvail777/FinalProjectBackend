import express, { Application } from 'express';
import * as functions from 'firebase-functions';
import { leaderboardRoutes } from './routes/LeaderboardRoutes';
import { NewUserRoute } from './routes/NewUserRoute';

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/leaderboard", leaderboardRoutes)
app.use("/newuser", NewUserRoute)
export const api = functions.https.onRequest(app);