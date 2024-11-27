import { ObjectId } from "mongodb";

export interface Schedule {
    _id?: ObjectId;
    major: string;
    weeknumber: Date;
    events: string[];
    startDate: Date;
    endDate: Date;
}
