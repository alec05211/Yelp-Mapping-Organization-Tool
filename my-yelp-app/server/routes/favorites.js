import express from 'express';
import { connectDB, client } from '../config/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const db = await connectDB();
        const items = db.collection('items'); 

        const result = await items.insertOne({
            ...req.body,
            type: "favorite", // Mark as favorite
            createdAt: new Date()
        });

        if (!result.acknowledged) {
            throw new Error('Insert operation not acknowledged');
        }

        res.status(201).json({
            message: 'Business added to favorites',
            insertedId: result.insertedId,
            business: req.body.name
        });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to add to favorites' });
    }
});

router.get('/', async (req, res) => {
    try {
        const db = await connectDB();
        const favorites = db.collection('items');

        const allFavorites = await favorites.find({}).toArray();

        res.status(200).json(allFavorites);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to retrieve favorites' });
    }
});


export default router;