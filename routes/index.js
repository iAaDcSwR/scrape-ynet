var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

// ROUTER ENDPOINTS

// GET '/hello' -> Send 'Hello World' in response body
router.get('/hello', function (req, res, next) {
  res.send('Hello World');
});

// GET '/headline' -> Send ynet's headline in response body
router.get('/headline', function (req, res, next) {
  var headline = '';
  request('https://www.ynet.co.il', function (err, res1, body) {
    if (err) throw err; // Throw error if one occurred
    let $ = cheerio.load(body);
    headline = $('#top-story-1 > div.top-story-main > div.top-story-text.ghcite > a.title > span').text(); // Select headline using DOM selector
    res.send(headline); // Send headline in response body
  });
});

// GET '/subtitle' -> Send ynet's subtitle in response body
router.get('/subtitle', function (req, res, next) {
  var subtitle = "";
  request('https://www.ynet.co.il', function (err, res1, body) {
    if (err) throw err; // Throw error if one occurred
    //console.log('body length: ' + body.length + '\nbody type: ' + typeof body)
    let $ = cheerio.load(body);
    subtitle = $('#top-story-1 > div.top-story-main > div.top-story-text.ghcite > a.sub-title').text(); // Select subtitle using DOM selector
    res.send(subtitle); // Send subtitle in response body
  });
});

router.get('*', function (req, res, next) {
  res.status(404).send('ERROR: This isn\'t a part of the task.')
});

module.exports = router;
