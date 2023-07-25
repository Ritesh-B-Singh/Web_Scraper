const express = require('express');
require('dotenv').config();
const scrapeURL = require('./scraper'); 
const cheerio = require('cheerio');
const getTop5Websites = require('./getTopFive')

const app = express();
const PORT = process.env.PORT || 5000;
const SCRAPINGBEE_API_KEY = process.env.SCRAPINGBEE_API_KEY;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/search', async (req, res) => {
    try {
        const { query } = req.query;
        const searchResults = await scrapeURL(`https://www.google.com/search?q=${query}`, SCRAPINGBEE_API_KEY);

        const top5URL = await getTop5Websites(searchResults)
        console.log(top5URL);

        res.json({ top5URL });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
