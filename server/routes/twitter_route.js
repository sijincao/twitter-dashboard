var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var config = require('../config');

var client = new Twitter(config.twitter_api_config);

router.get('/tweets/:screen_name', function (req, res) {
    var params = {
        screen_name: req.params.screen_name,
        count: req.query.count || 30
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            res.status(200).json({tweets: tweets});
        }
    });
});

module.exports = router;