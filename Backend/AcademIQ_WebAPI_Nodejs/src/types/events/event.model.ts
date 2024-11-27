import { ObjectId } from "mongodb";

export interface Events{
    _id: ObjectId;
    type: 'class' | 'exam' | 'assignment' | 'holiday' | 'other';
    relatedId: ObjectId;
    eventDate: Date;
    location: string;
}