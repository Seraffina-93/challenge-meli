const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const redisClient = require('../startup/redisClient');

//it gets the stats from redis
router.get('/', async (req, res) => {
    var key = "stats";
    redisClient.get(key, (err, data) => {
        if(err) throw err;

        if(data != null) {
            console.log(JSON.parse(data));
            res.status(200).send(data);
        } else {
            console.log("No statistics regitered");
            //when trying to get stats before any was registered
            res.status(400).send("No statistics registered");
        }
    });   
});


module.exports = router;