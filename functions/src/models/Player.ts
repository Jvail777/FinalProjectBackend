import { ObjectId } from "mongodb";
import { Game } from "./Game";

export default interface Player {
  _id?: ObjectId;
  googleId?: string;
  name: string;
  games: Game[];
}
