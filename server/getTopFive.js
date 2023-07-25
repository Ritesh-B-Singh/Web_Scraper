const cheerio = require('cheerio');
const getWebsiteTexts = require('./getWebsiteTexts');

async function getText(url) {
    return await getWebsiteTexts(url);
}

async function getTop5Websites(htmlResponse) {
    const $ = cheerio.load(htmlResponse);

    const topFiveResults = [];

    const topFivePromises = $('.tF2Cxc').map(async (index, element) => {
        if (index < 5) {
            const url = $(element).find('a').attr('href');
            let newUrl;
            if (url && url.startsWith('/url?q=')) {
                const cleanedUrl = decodeURIComponent(url.split('/url?q=')[1].split('&sa=')[0]);
                newUrl = cleanedUrl;
            } else {
                newUrl = url;
            }

            const text = await getText(newUrl);
            topFiveResults.push({ url: newUrl, text: text });
        }
    }).get();

    // Wait for all promises to resolve
    await Promise.all(topFivePromises);

    return topFiveResults;
}

module.exports = getTop5Websites;
