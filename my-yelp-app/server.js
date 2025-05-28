import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()
app.use(cors())

const YELP_API_KEY = 'obsRWztNDaLsHcHdPzMFzgr0dDusV6SdhZK-u-eFoF8igrh0XxGK2MwRyJNMMkUor_6kRasFBOdmwn3O9htYzXXM24I93O6hlVz7prIi0zIdPzqlR9tklBRaKGU3aHYx' // API key found on yelp developer page.

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