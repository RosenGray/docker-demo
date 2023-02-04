const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const app = express();

 


app.use(bodyParser.json())

app.get('/',(req,res) => {
res.sendFile(path.join(__dirname,"index.html"))
   
})

app.get('/kitten',(req,res) => {
    let img = fs.readFileSync(path.join(__dirname, "images/kitten.jpeg"));
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  
})




// use when starting application locally
const mongoUrlLocal = "mongodb://admin:123456@localhost:27017";

// use when starting application as docker container
const mongoUrlDocker = "mongodb://admin:password@mongodb";

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// "user-account" in demo with docker. "my-db" in demo with docker-compose
const dockerDbName = "my-db";

const localDbName = "user-account";

app.post('/update-profile', function (req, res) {
  let userObj = req.body;


  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(dockerDbName);
    userObj['userid'] = 1

    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };

    db.collection("users").updateOne(myquery, newvalues, {upsert: true}, function(err, res) {
      if (err) console.log(11,err)
      client.close();
    });

  });
  // Send response
  res.json(userObj);
});

app.get('/get-profile', function (req, res) {
  let response = {};
  // Connect to the db
  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(dockerDbName);

    let myquery = { userid: 1 };

    db.collection("users").findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});





app.listen(3002,function(){
    console.log('app listening on port 3002')
})