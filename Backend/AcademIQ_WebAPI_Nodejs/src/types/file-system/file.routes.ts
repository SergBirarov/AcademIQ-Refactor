import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { MongoClient, GridFSBucket, Db, ObjectId } from 'mongodb';
import { authenticateJWT } from '../../utils/helpers';
import { Readable } from 'stream';
import { getDb } from '../../mongo-db/server'; // Assuming you have a function to get the MongoDB connection
import {upload, getFile} from './file.controller'

const fileRouter = Router();

const uploadMiddleware = multer().single('file');

fileRouter.post('/upload', authenticateJWT,uploadMiddleware, upload)
          .get('/download-file/:id', authenticateJWT, getFile);


export default fileRouter;