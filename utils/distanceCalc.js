//Calculates the distance between two points, using the latitude and longitude
//Based on the Haversine formula that determines the grate-circle distance between 2 points

const LAT_BA = -34.6083;
const LONG_BA = -58.3712;

function getDistance(lat, long) {
    if (LAT_BA == lat && LONG_BA == long) {
        return 0;
    }
    
    var R = 6371;   // Radius of the earth
    var distLat = toRad(lat-LAT_BA);  
    var distLong = toRad(long-LONG_BA); 
    var a = 
      Math.sin(distLat/2) * Math.sin(distLat/2) +
      Math.cos(toRad(LAT_BA)) * Math.cos(toRad(lat)) * 
      Math.sin(distLong/2) * Math.sin(distLong/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 
    return d;     //it returns the distance in km
  }
  
  function toRad(deg) {
    return deg * (Math.PI/180)
  }

module.exports = getDistance;