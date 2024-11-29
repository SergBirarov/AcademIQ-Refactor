import { ObjectId } from "mongodb";

export interface Event{
    _id: string | ObjectId;
    eventId?: string | ObjectId;
    title: string;
    type: 'class' | 'exam' | 'assignment' | 'holiday' | 'other';
    relatedId?: string | ObjectId;
    eventDate: Date;
    location: string;
    description?: string;
    addedBy?: string | ObjectId| number; 
}

export interface CalendarData {
    schedule: {
        day: string;
        hour: string;
        courseName: string;
        classroom: string;
        instructorName: string;
    }[];
    events: Event[]; 
    assignments: {
        title: string;
        dueDate: Date;
    }[]; 
}