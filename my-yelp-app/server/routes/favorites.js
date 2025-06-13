require('dotenv').config();
const express = require('express');
const router = express.Router();
const { connectDB, client } = require('../config/db');

router.post('/', async (req, res) => {
    // reg.body should contain the business data to be saved that was posted by the ExpandedBusinessView component
    try {
        const db = await connectDB();                       // connects to the database
        const favorites = db.collection('favorites');       // gets the favorites collection

        const result = await favorites.insertOne({
            ...req.body,
            createdAt: new Date()
        });

        // Check if insertion was successful
        if (!result.acknowledged) {
            throw new Error('Insert operation not acknowledged');
        }

        // Send back the inserted document ID and confirmation
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

module.exports = router;