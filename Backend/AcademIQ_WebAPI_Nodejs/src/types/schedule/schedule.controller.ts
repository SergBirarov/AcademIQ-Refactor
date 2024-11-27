import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../../mongo-db/server';
import { Schedule } from './schedule.model';

// Add Schedule
export const addSchedule = async (req: Request, res: Response) => {
    const db = getDb();
    const scheduleCollection = db.collection<Schedule>('schedules');

    const { major, weeknumber, events, startDate, endDate } = req.body;

    try {
        const schedule: Schedule = {
            major,
            weeknumber: new Date(weeknumber),
            events,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        };

        const result = await scheduleCollection.insertOne(schedule);

        res.status(201).json({ message: 'Schedule created successfully.', scheduleId: result.insertedId });
    } catch (error) {
        console.error('[SCHEDULE] Error creating schedule:', error);
        res.status(500).json({ error: 'An error occurred while creating the schedule' });
    }
};

// Get All Schedules
export const getSchedules = async (req: Request, res: Response) => {
    const db = getDb();
    const scheduleCollection = db.collection<Schedule>('schedules');

    try {
        const schedules = await scheduleCollection.find({}).toArray();
        res.status(200).json(schedules);
    } catch (error) {
        console.error('[SCHEDULE] Error fetching schedules:', error);
        res.status(500).json({ error: 'An error occurred while fetching schedules' });
    }
};

// Update Schedule
export const updateSchedule = async (req: Request, res: Response) => {
    const db = getDb();
    const scheduleCollection = db.collection<Schedule>('schedules');

    const { scheduleId, major, weeknumber, events, startDate, endDate } = req.body;

    try {
        const updatedFields: Partial<Schedule> = {};
        if (major) updatedFields.major = major;
        if (weeknumber) updatedFields.weeknumber = new Date(weeknumber);
        if (events) updatedFields.events = events;
        if (startDate) updatedFields.startDate = new Date(startDate);
        if (endDate) updatedFields.endDate = new Date(endDate);

        const result = await scheduleCollection.updateOne(
            { _id: new ObjectId(scheduleId) },
            { $set: updatedFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Schedule not found.' });
        }

        res.status(200).json({ message: 'Schedule updated successfully.' });
    } catch (error) {
        console.error('[SCHEDULE] Error updating schedule:', error);
        res.status(500).json({ error: 'An error occurred while updating the schedule' });
    }
};

// Delete Schedule
export const deleteSchedule = async (req: Request, res: Response) => {
    const db = getDb();
    const scheduleCollection = db.collection<Schedule>('schedules');

    const { scheduleId } = req.query;

    try {
        const result = await scheduleCollection.deleteOne({ _id: new ObjectId(scheduleId as string) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Schedule not found.' });
        }

        res.status(200).json({ message: 'Schedule deleted successfully.' });
    } catch (error) {
        console.error('[SCHEDULE] Error deleting schedule:', error);
        res.status(500).json({ error: 'An error occurred while deleting the schedule.' });
    }
};
