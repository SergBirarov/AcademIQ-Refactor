import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../../mongo-db/server';
import { Event } from './event.model';

// Add Event
export const addEvent = async (req: Request, res: Response) => {
    const db = getDb();
    const eventsCollection = db.collection<Event>('events');

    const { eventId, title, type, relatedId, eventDate, location, description, addedBy } = req.body;

    try {
        const event: Event = {
            _id: new ObjectId(),
            eventId,
            title,
            type,
            relatedId,
            eventDate: new Date(eventDate),
            location,
            description,
            addedBy,
        };

        const result = await eventsCollection.insertOne(event);

        res.status(201).json({ message: 'Event created successfully.', eventId: result.insertedId });
    } catch (error) {
        console.error('[EVENTS] Error creating event:', error);
        res.status(500).json({ error: 'An error occurred while creating the event' });
    }
};

// Get Calendar Data (General or Specific)
export const getCalendarData = async (req: Request, res: Response) => {
    const db = getDb();
    const eventsCollection = db.collection<Event>('events');

    const { userId, courseIds } = req.query;
    console.log("getCalendarData", userId, courseIds);

    try {
        // If no studentId is provided, return general holidays only
        if (!userId) {
            const holidays = await eventsCollection.find({ type: 'holiday' }).toArray();
            return res.status(200).json(holidays);
        }
        const parsedCourseIds = courseIds ? JSON.parse(courseIds as string) : [];

        console.log("parsedCourseIds", parsedCourseIds);
        // Fetch the courses, exams, and personal events for the student
        const events = await eventsCollection.find({
            $or: [
                { type: 'holiday' },
                { type: 'exam', relatedId: { $in: parsedCourseIds } },
                { type: 'class', relatedId: { $in: parsedCourseIds } },
                { addedBy: userId }
            ]
        }).toArray();

        res.status(200).json(events);
    } catch (error) {
        console.error('[EVENTS] Error fetching calendar data:', error);
        res.status(500).json({ error: 'An error occurred while fetching calendar data' });
    }
};

// Get All Events
export const getEvents = async (req: Request, res: Response) => {
    const db = getDb();
    const eventsCollection = db.collection<Event>('events');

    try {
        const events = await eventsCollection.find({}).toArray();
        res.status(200).json(events);
    } catch (error) {
        console.error('[EVENTS] Error fetching events:', error);
        res.status(500).json({ error: 'An error occurred while fetching events' });
    }
};

// Update Event
export const updateEvent = async (req: Request, res: Response) => {
    const db = getDb();
    const eventsCollection = db.collection<Event>('events');

    const { eventId, type, relatedId, eventDate, location, title, description, addedBy } = req.body;

    try {
        const updatedFields: Partial<Event> = {};
        if (type) updatedFields.type = type;
        if (relatedId) updatedFields.relatedId = new ObjectId(relatedId);
        if (eventDate) updatedFields.eventDate = new Date(eventDate);
        if (location) updatedFields.location = location;
        if (title) updatedFields.title = title;
        if (description) updatedFields.description = description;
        if (addedBy) updatedFields.addedBy = new ObjectId(addedBy);

        const result = await eventsCollection.updateOne(
            { _id: new ObjectId(eventId) },
            { $set: updatedFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        res.status(200).json({ message: 'Event updated successfully.' });
    } catch (error) {
        console.error('[EVENTS] Error updating event:', error);
        res.status(500).json({ error: 'An error occurred while updating the event' });
    }
};

// Delete Event
export const deleteEvent = async (req: Request, res: Response) => {
    const db = getDb();
    const eventsCollection = db.collection<Event>('events');

    const { eventId } = req.query;

    try {
        const result = await eventsCollection.deleteOne({ _id: new ObjectId(eventId as string) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        console.error('[EVENTS] Error deleting event:', error);
        res.status(500).json({ error: 'An error occurred while deleting the event.' });
    }
};
