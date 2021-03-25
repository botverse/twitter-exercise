require('dotenv').config();
const path = require('path')
const express = require('express');
const Twitter = require('twitter');

const client = new Twitter({
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
});
 
const defaults = {
  screen_name: 'POTUS',
  tweet_mode: 'extended',
  count: 20,
};

const app = express();

app.route('/:handle')
  .get(function(req, res) {
    const params = {
      ...defaults,
      max_id: req.query.max_id,
      screen_name: req.params.handle,
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        res.json(tweets);
      } else {
        console.error(error)
        res.statusCode = 500;
        res.end(error.toString());
      }
    });
  });

app.use(express.static("./public"));

const port = process.env.PORT || 3001;
app.listen(port, function(error) {
  console.log('POTUS listening on port ' + port);
});

