const axios = require('axios');
const cheerio = require('cheerio');

async function getWebsiteTexts(url) {
  let websiteTexts;

  try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      const bodyText = $('body').text().trim();

      websiteTexts = bodyText;
  } catch (error) {
    console.error('Error fetching website content:', error.message);
  }

  return websiteTexts;
}

module.exports = getWebsiteTexts;
