import express from 'express'
import axios from 'axios'
import cors from 'cors'
import favoritesRouter from './routes/favorites.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', favoritesRouter)

const YELP_API_KEY = import.meta.env.REACT_APP_YELP_API_KEY;

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

app.listen(5000, () => console.log('Proxy server running on http://localhost:5000'))