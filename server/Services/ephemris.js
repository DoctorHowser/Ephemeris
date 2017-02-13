let swisseph = require ('swisseph');
let moment = require('moment-timezone');


var flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

// path to ephemeris data
swisseph.swe_set_ephe_path (__dirname + '/../ephe');

var date = {year: "1984", month: "03", day: "29", hour: "11", minute: "07", second: "0", timeZone: "America/New_York"};
let place = {lat: 40.9793, long: -74.1165};
console.log ('Date:', date);


module.exports = {
    getEphemeris : getEphemeris
};

// Julian day
//MUST BE IN UTC
function getEphemeris(birthdate, location) {
    resetPlanetsReturn();

    let utcDateTime = getUtcDate(date);

    let juldate = swisseph.swe_julday(utcDateTime.year(), utcDateTime.month(), utcDateTime.day(), utcDateTime.hour(), swisseph.SE_GREG_CAL);
    setPlanets(juldate, location);
    return getPlanets();
}
// Test date



//TODO Break into own API, free access, returning JSON data for app

    let planets = {
        "Sun": swisseph.SE_SUN,
        "Moon": swisseph.SE_MOON,
        "Mercury": swisseph.SE_MERCURY,
        "Venus": swisseph.SE_VENUS,
        "Mars": swisseph.SE_MARS,
        "Jupiter": swisseph.SE_JUPITER,
        "Saturn": swisseph.SE_SATURN,
        "Uranus": swisseph.SE_URANUS,
        "Neptune": swisseph.SE_NEPTUNE,
        "Pluto": swisseph.SE_PLUTO
    };

let planetsReturn = {
    "Sun": {},
    "Moon": {},
    "Mercury": {},
    "Venus": {},
    "Mars": {},
    "Jupiter": {},
    "Saturn": {},
    "Uranus": {},
    "Neptune": {},
    "Pluto": {},
    "Houses": [],
    "Ascendant": ""
};

function resetPlanetsReturn(){
    planetsReturn = {
        "Sun": {},
        "Moon": {},
        "Mercury": {},
        "Venus": {},
        "Mars": {},
        "Jupiter": {},
        "Saturn": {},
        "Uranus": {},
        "Neptune": {},
        "Pluto": {},
        "Houses": [],
        "Ascendant": ""
    };
}


    strtime = function (value) {
        var hour = Math.floor(value);
        var minFrac = (value - hour) * 60;
        var min = Math.floor(minFrac);
        var sec = Math.floor((minFrac - min) * 60);

        return hour + ' ' + min + ' ' + sec;
    };

    logbody = function (name, body) {
        var lang = body.longitude;
        var house = Math.floor(lang / 30);
        var lang30 = lang - house * 30;

        console.log(name + ':', body.longitude, '|', strtime(lang30), '|', house, body.longitudeSpeed < 0 ? 'R' : '');
//    console.log (name + ' info:', body);
    };
    function getPlanets(){
        return planetsReturn;
    }


    function setPlanets(julday_ut, location) {
        Object.keys(planets).forEach(function (key, index) {
            swisseph.swe_calc_ut(julday_ut, planets[key], flag, function (body) {
                planetsReturn[key] = body;
               //logbody(key, body);
            });
        });

        swisseph.swe_houses(julday_ut, place.lat, place.long, 'A', function (result) {
            planetsReturn.Houses = result.house;
            planetsReturn.Ascendant = result.ascendant;
            let ascendantLong = result.ascendant;
        });
    }

    function getUtcDate(unprocessedDateTime) {

        let dateTimeString = getDateTimeString(unprocessedDateTime);

        let utcDateTime = moment.tz(dateTimeString, unprocessedDateTime.timeZone).utc();
//instead, use momentjs

       console.log('utc:', utcDateTime);
        return utcDateTime
    }

    function getTimeZoneString(utcOffsetNumber) {

    }

    function getDateTimeString(dateTimeObject){
        let string = dateTimeObject.year + "-" +
                dateTimeObject.month + "-" +
                dateTimeObject.day + " " +
                dateTimeObject.hour + ":" +
                dateTimeObject.minute;

        console.log(string);
        return string
    }







