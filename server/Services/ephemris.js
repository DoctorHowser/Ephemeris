let swisseph = require ('swisseph');
let moment = require('moment-timezone');


var flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

// path to ephemeris data
swisseph.swe_set_ephe_path (__dirname + '/../server/data');

// var date = {year: "1984", month: "03", day: "29", hour: "11", minute: "07", second: "0", timeZone: "America/New_York"};
// let place = {lat: 40.9793, lon: -74.1165};

module.exports = {
    getEphemeris : getEphemeris
};

// Julian day
//MUST BE IN UTC
function getEphemeris(birthDateTime, location) {
    resetPlanetsReturn();
    let utcDateTime = getUtcDate(birthDateTime);
    let juldate = swisseph.swe_utc_to_jd (utcDateTime.year(), (utcDateTime.month() +1), utcDateTime.date(), utcDateTime.hour(), utcDateTime.minute(), 0, swisseph.SE_GREG_CAL);
    let julUTC = juldate.julianDayUT;

    setPlanets(julUTC, location);
    return getPlanets();
}

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
    };


    function getPlanets(){
        return planetsReturn;
    }


    function setPlanets(julday_ut, location) {
        Object.keys(planets).forEach(function (key, index) {
            swisseph.swe_calc_ut(julday_ut, planets[key], flag, function (body) {
                planetsReturn[key] = body;
            });
        });

        swisseph.swe_houses(julday_ut, location.lat, location.lon, 'P', function (result) {
            planetsReturn.Houses = result.house;
            planetsReturn.Ascendant = result.ascendant;
        });
    }
    function getUtcDate(unprocessedDateTime) {

        let dateTimeString = getDateTimeString(unprocessedDateTime);
        let utcDateTime = moment.tz(dateTimeString, unprocessedDateTime.timeZone).utc();

        return utcDateTime
    }


    function getDateTimeString(dateTimeObject){
        let string = dateTimeObject.year +
                dateTimeObject.month +
                dateTimeObject.day + "T" +
                dateTimeObject.hour +
                dateTimeObject.minute;
        return string
    }







