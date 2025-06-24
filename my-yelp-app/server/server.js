import express from 'express'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'
import favoritesRouter from './routes/favorites.js'
import foldersRouter from './routes/folders.js'
import { connectDB } from './config/db.js';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/favorites', favoritesRouter)
app.use('/api/folders', foldersRouter)

const YELP_API_KEY = process.env.VITE_YELP_API_KEY; // Use correct environment variable name

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});