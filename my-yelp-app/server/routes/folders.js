// server/routes/folders.js
import express from 'express';
const router = express.Router();
import { connectDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

router.post('/', async (req, res) => {
  const { name, parentFolderId } = req.body;
  try {
    const db = await connectDB();
    const items = db.collection('items');

    const result = await items.insertOne({
      name,
      type: "folder",
      parentFolderId: parentFolderId || null, 
      favoriteIds: [], // initialize an empty folder with no favorites
      createdAt: new Date(),
    });

    if (!result.acknowledged) { throw new Error('Insert operation not acknowledged'); }

    const newFolder = await items.findOne({ _id: result.insertedId });

    res.status(201).json(newFolder);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to create folder' });
  }
});

router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const items = db.collection('items'); // <-- Use 'items' collection

    // Only get folders from items collection
    const allFolders = await items.find({ type: "folder" }).toArray();

    res.status(200).json(allFolders);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to retrieve folders' });
  }
});

// Move a favorite to a folder
router.post('/add-favorite', async (req, res) => {
  const { favoriteId, folderId } = req.body;
  try {
    const db = await connectDB();
    const items = db.collection('items');

    // Update the favorite's folderId
    await items.updateOne(
      { _id: new ObjectId(favoriteId), type: "favorite" },
      { $set: { folderId: folderId ? new ObjectId(folderId) : null } }
    );

    // Optionally, update the folder's favoriteIds array
    if (folderId) {
      await items.updateOne(
        { _id: new ObjectId(folderId), type: "folder" },
        { $addToSet: { favoriteIds: new ObjectId(favoriteId) } }
      );
    }

    res.status(200).json({ message: "Favorite moved to folder" });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to move favorite' });
  }
});

export default router;