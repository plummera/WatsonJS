'use strict';

var insights = require('watson-developer-cloud/personality-insights/v3');
var twitter = require('node-twitter')
var fs = require('fs');

var personality_insights = new insights({
  username: 'b79efe2a-2f93-496a-8914-a816a3a5796d',
  password: 'M8NwqbHc8Ebs',
  version_date: '2016-19-10'
});

// The Twitter API credentials
var twitterRestClient = new twitter.RestClient(
  'A6yvzpyzrSMBCetadw48BWiUh',
  'ZeVZTuUuy8Fxkc8nY7QmrDXME5td95zNf75hv9mNJGjlEid6Le',
  '24148996-po48EiuLoPmfAotl0joGyfGh0TBiJilDPg7D6rpGb',
  'vgiJdK1CRsiFx7Fbc7prJZ6LziMwCaIQ7tWLmnevAnEcS'
);

twitterRestClient.statusesHomeTimeline({}, function(error, result) {
  if (error)
  {
    console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
  }

  if (result)
  {
    // console.log(result);
    personality_insights.profile({
      text: result,
      consumption_preferences: true,
      csv_headers: true,
      headers: {
        'Accept': 'text/csv',
      }
    },
    function (err, response) {
      if (err)
      {
        console.log('error', err);
      }

      else
      {
        console.log(JSON.stringify(response, null, 2));
      }
    }).pipe(fs.createWriteStream('./output.csv'));
  }
});
