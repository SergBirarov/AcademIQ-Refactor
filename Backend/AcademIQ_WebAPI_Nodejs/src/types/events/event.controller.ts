import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../../mongo-db/server';
import { Events } from './event.model';

// Add Event
export const addEvent = async (req: Request, res: Response) => {
    const db = getDb();
    const eventsCollection = db.collection<Events>('events');

    const { type, relatedId, eventDate, location } = req.body;

    try {
        const event: Events = {
            _id: new ObjectId(),
            type,
            relatedId,
            eventDate: new Date(eventDate),
            location,
        };

        const result = await eventsCollection.insertOne(event);

        res.status(201).json({ message: 'Event created successfully.', eventId: result.insertedId });
    } catch (error) {
        console.error('[EVENTS] Error creating event:', error);
        res.status(500).json({ error: 'An error occurred while creating the event' });
    }
};

// Get All Events
export const getEvents = async (req: Request, res: Response) => {
    const db = getDb();
    const eventsCollection = db.collection<Events>('events');

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
    const eventsCollection = db.collection<Events>('events');

    const { eventId, type, relatedId, eventDate, location } = req.body;

    try {
        const updatedFields: Partial<Events> = {};
        if (type) updatedFields.type = type;
        if (relatedId) updatedFields.relatedId = new ObjectId(relatedId);
        if (eventDate) updatedFields.eventDate = new Date(eventDate);
        if (location) updatedFields.location = location;

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
    const eventsCollection = db.collection<Events>('events');

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
