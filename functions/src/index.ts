import cors from 'cors';
import express, { Application } from 'express';
import * as functions from 'firebase-functions';
import { playerRoutes } from './routes/PlayerRoutes';


const app:Application = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", playerRoutes)

export const api = functions.https.onRequest(app);