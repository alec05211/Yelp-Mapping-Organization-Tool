const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = import.meta.env.MONGODB_URI;
const client = new MongoClient(uri);

router.post('/favorites', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('yelpapp');
    const favorites = database.collection('favorites');

    const result = await favorites.insertOne({
      ...req.body,
      createdAt: new Date(),
      // Add user ID here when you implement authentication
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to add to favorites' });
  } finally {
    await client.close();
  }
});

module.exports = router;