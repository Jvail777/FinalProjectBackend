import express, { Application } from 'express';
import * as functions from "firebase-functions";

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

export const api = functions.https.onRequest(app);