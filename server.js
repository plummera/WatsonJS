var cors = require("cors-express");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var md5 = require("md5");

var app = express(),
  options = {
    allow: {
      origin: '*',
      methods: 'GET,PATCH,PUT,POST,DELETE,HEAD,OPTIONS',
      headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
    },
    expose :{
      headers: null
    },
    max : {
      age: null
    },
    options : function(req, res, next) {
      if (req.method == 'OPTIONS') {
        res.status(200).end();
      } else {
        next();
      }
    },
    specials: {
      powered: null
    }
  };

app.use(cors(options));

app.get('/', function (req, res) {
  res.send("Hello World!");
});

app.listen(3000, function() {
  console.log('App listening on port 3000');
});
