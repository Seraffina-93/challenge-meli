const updateStats = require('../utils/updateStats');
const redisClient = require('../startup/redisClient');

//looks for the country info in the cache
function cache(req, res, next){
    const code = res.code;
    redisClient.get(code, (err, data) => {
        if(err) throw err;

        if(data != null) {
            countryObj = JSON.parse(data);
            console.log("Getting data from cache...");
            console.log(countryObj);
            updateStats(countryObj);
            res.status(200).send(data);
        } else {
            next();
        }
    });
}

module.exports = cache;