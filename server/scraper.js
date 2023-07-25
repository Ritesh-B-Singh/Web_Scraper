const scrapingbee = require('scrapingbee');

async function scrapeURL(url, apiKey) {
    try {
        var client = new scrapingbee.ScrapingBeeClient(apiKey);
        var response = await client.get({
            url: encodeURI(url),
            params: {
                custom_google: true
            },
        });

        var decoder = new TextDecoder();
        var text = decoder.decode(response.data);

        return text;
    } catch (error) {
        return 'A problem occurs : ' + error.response.data;
    }
}

module.exports = scrapeURL;
