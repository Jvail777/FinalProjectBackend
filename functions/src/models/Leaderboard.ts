import {ObjectId} from "mongodb";

export default interface Leaderboard {
    _id?: ObjectId,
    name: string,
    score: number,
    difficulty: string
}