import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { MongoClient, GridFSBucket, Db, ObjectId } from 'mongodb';
import { Readable } from 'stream';
import { getDb } from '../../mongo-db/server'; // Assuming you have a function to get the MongoDB connection

const getBucket = (db: Db) => new GridFSBucket(db, { bucketName: 'uploads' });


export const upload = async (req:Request, res:Response) => {
    try {
        // Ensure file is available in the request
        if (!req.file) {
          return res.status(400).json({ message: 'No file provided.' });
        }
    
        // Extract file information from request
        const { file } = req;
        const type = req.body.type;
        const db = getDb();
        const bucket = getBucket(db);
    
        // Create a readable stream from the file's buffer
        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);
    
        // Define the metadata for the file
        const metadata = {
          userId: (req as any).user.Id, // JWT Middleware sets req.user
          type:  req.body.type || 'assignment',
        };
    
        // Create a GridFS upload stream
        const uploadStream = bucket.openUploadStream(file.originalname, {
          contentType: file.mimetype,
          metadata,
        });
    
        // Pipe the readable stream into the GridFS upload stream
        readableStream
          .pipe(uploadStream)
          .on('error', (err: Error) => {
            res.status(500).json({ message: 'Error uploading file', error: err.message });
          })
          .on('finish', () => {
            res.status(201).json({ message: 'File uploaded successfully', fileId: uploadStream.id });
          });
      } catch (error) {
        console.error('[UPLOAD] Error:', error);
        res.status(500).json({ message: 'An error occurred during file upload', error: error });
      }
}

export const getFile = async (req:Request, res:Response) => {
    try {
        const db = getDb();
        const bucket = getBucket(db);
        const fileId = new ObjectId(req.params.id);
    
        const downloadStream = bucket.openDownloadStream(fileId);
    
        downloadStream
          .pipe(res)
          .on('error', (err: Error) => {
            res.status(500).json({ message: 'Error downloading file', error: err.message });
          })
          .on('finish', () => {
            res.status(200);
          });
      } catch (error) {
        console.error('[DOWNLOAD] Error:', error);
        res.status(500).json({ message: 'An error occurred during file download', error: error });
      }
}
