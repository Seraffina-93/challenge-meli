const getDistance = require('./distanceCalc');

//it returns only the useful data from the API objects
function refactorObject(data, currency) {
    const currCode = data.currencies[0].code;

    const distance = getDistance(data.latlng[0], data.latlng[1]);
    
    var countryObj = {
        country: data.name,
        ISOCode: data.alpha3Code,
        languages: [],
        currency: `${data.currencies[0].code} (1 ${data.currencies[0].code} = ${currency.rates[currCode]} EUR)`,
        timeZones: [],
        latlng: [],
        distanceToBsAs: distance
    }

    data.languages.forEach(element => {
        countryObj.languages.push(`${element.name} (${element.iso639_1})`);
    });

    data.timezones.forEach(element => {
        countryObj.timeZones.push(element);
    });

    data.latlng.forEach(element => {
        countryObj.latlng.push(element);
    });

    return countryObj;
}

module.exports = refactorObject;