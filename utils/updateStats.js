const redisClient = require('../startup/redisClient');

//It adds the new data for the stats
function addStatistics(countryObj){
    try {
        var key = "stats";
        redisClient.get(key, (err, data) => {
            if (err) throw err;

            if (data != null){
                var stats = JSON.parse(data);
                stats.calls++;
                stats.dist+= countryObj.distanceToBsAs;
                stats.avg = calculateAvg(stats);
                //now it compares the min and max distance saved with the new one
                statsUpdated = updateMinMax(stats, countryObj);
                //Update redis stats
                redisClient.set(key, JSON.stringify(statsUpdated));
                
            }
            else {
                //when trying to update stats for the first time, before any was registered
                var stats = {
                    calls: 1,
                    dist: countryObj.distanceToBsAs,
                    mincode: countryObj.ISOCode,
                    mindist: countryObj.distanceToBsAs,
                    maxcode: countryObj.ISOCode,
                    maxdist: countryObj.distanceToBsAs,
                    avg: countryObj.distanceToBsAs
                }
                //it saves the stats in redis for 1 day
                redisClient.setex(key, 86400, JSON.stringify(stats));
            }
        });
    }
    catch(err){
        console.log(err);
    }
}
//Compares the current country distance with the min and max saved
function updateMinMax(stats, countryObj){
    if (countryObj.distanceToBsAs <= stats.mindist) {
        stats.mindist = countryObj.distanceToBsAs;
        stats.mincode = countryObj.ISOCode;
    }
    if (countryObj.distanceToBsAs >= stats.maxdist) {
        stats.maxdist = countryObj.distanceToBsAs;
        stats.maxcode = countryObj.ISOCode;
    }
    return stats;
}

function calculateAvg(stats) {
    avg = stats.dist / stats.calls;
    stats.avg = avg;
    return avg;
}

module.exports = addStatistics;