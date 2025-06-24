// server/routes/folders.js
import express from 'express';
const router = express.Router();
import { connectDB } from '../config/db.js';

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const db = await connectDB();
    const folders = db.collection('folders');

    const result = await folders.insertOne({
      name,
      createdAt: new Date(),
    });

    if (!result.acknowledged) { throw new Error('Insert operation not acknowledged'); }

    // Fetch the newly created folder document
    const newFolder = await folders.findOne({ _id: result.insertedId });

    res.status(201).json(newFolder); // Return the full folder object
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to create folder' });
  }
});

router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const folders = db.collection('folders');

    const allFolders = await folders.find({}).toArray();

    res.status(200).json(allFolders);
  } catch (error) {
    console.error('Database error:', error);
    console.log('this is happening');
    res.status(500).json({ error: 'Failed to retrieve folders' });
  }
});

export default router;