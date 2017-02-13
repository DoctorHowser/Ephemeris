var express = require('express');
var router = express.Router();
var path = require('path');

let requestValidator = require('../Services/requestValidationService');
let ephemeris = require('../Services/ephemris');

router.get('/ephemeris', requestValidator.checkParams, function (req, res, next) {

    let birthDateAndTime = {
        month: req.params.month,
        day: req.params.day,
        year: req.params.year,
        hour: req.params.hour,
        minute: req.params.minute,
        timeZone: req.params.timeZone
    };

    let location = {
        lat: req.params.lat,
        lon: req.params.lon
    };

    let response = ephemeris.getEphemeris(birthDateAndTime, location);
    console.log("response: ", response);
    res.send(response)
});


router.get("/", function(req, res, next){
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, "../public", file));
});

router.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!')
});

module.exports = router;