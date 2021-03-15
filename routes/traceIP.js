const express = require('express');
const router = express.Router();
const cache = require('../middleware/cache');
const {getCountryCode, getCountryData} = require('../middleware/countryInfo');

//it gets the info from the country based on the IP
//first it looks for the country code, then looks for that code in redis
//if it's not in redis, then it calls the APIs to get the info
router.get('/:ip', [getCountryCode, cache, getCountryData], (req, res) => {
    try{
        const countryObj = res.countryObj;
        res.status(200).send(countryObj);
    }
    catch(err){
        res.send(err);
    }
});


module.exports = router;
