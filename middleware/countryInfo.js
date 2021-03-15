const updateStats = require('../utils/updateStats');
const refactorObject = require('../utils/refactorObject');
const redisClient = require('../startup/redisClient');
const fetch = require('node-fetch');


//finds country code based on IP
async function getCountryCode(req, res, next) {
    try{
        const {ip} = req.params;
        const response = await fetch(`https://api.ip2country.info/ip?${ip}`);
        const data = await response.json();
        const code = data.countryCode3;

        res.code = code;
        next();
    }
    catch(err){
        console.log(err);
        req.status(500);
    }

}

//finds country info based in country code
async function getCountryData(req, res, next) {
    const code = res.code;

    let response = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}?fields=name;alpha3Code;languages;currencies;timezones;latlng`);
    const data = await response.json();

    response = await fetch(`http://data.fixer.io/api/latest?access_key=1d36ca93d4899bf443eaea7223b4c078&format=1`);
    const currency = await response.json();
    
    const countryObj = refactorObject(data,currency);
    console.log(countryObj);

    //saves the country data in redis for 1 hour
    redisClient.setex(code, 3600, JSON.stringify(countryObj));

    //updates the statistics with the new data
    updateStats(countryObj);

    res.countryObj = countryObj;
    next();

}

module.exports = {getCountryCode, getCountryData}