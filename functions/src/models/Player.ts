import {ObjectId} from "mongodb";

export default interface Player {
    _id?: ObjectId,
    id?: string,
    name: string,
    games?: [
        {
            category: string,
            difficulty: string,
            score: number
        }
    ]
}