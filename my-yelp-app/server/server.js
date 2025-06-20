import express from 'express'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'
import favoritesRouter from './routes/favorites.js'
import { connectDB } from './config/db.js';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/favorites', favoritesRouter)

// Use correct environment variable name
const YELP_API_KEY = process.env.VITE_YELP_API_KEY;

app.get('/api/search', async (req, res) => {
  try {
    const { term, location } = req.query
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: {
        term,
        location,
      },
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

// app.get('/test-db', async (req, res) => {
//   console.log('route hit');
//   await connectDB();
//   res.send('DB connection attempted');
// });
// router.get('/test', async (req, res) => {
//   try {
//     const db = await connectDB();
//     const favorites = db.collection('favorites');
//     const result = await favorites.insertOne({ test: true, createdAt: new Date() });
//     res.json({ insertedId: result.insertedId });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});