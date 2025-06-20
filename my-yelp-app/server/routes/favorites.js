import express from 'express';
import { connectDB, client } from '../config/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const db = await connectDB();
        const favorites = db.collection('favorites');

        const result = await favorites.insertOne({
            ...req.body,
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

export default router;