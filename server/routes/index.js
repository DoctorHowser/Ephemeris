var express = require('express');
var router = express.Router();
var path = require('path');

let requestValidator = require('../Services/requestValidationService');
let ephemeris = require('../Services/ephemris');

router.get('/ephemeris', requestValidator.checkParams, function (req, res, next) {

    let birthDateAndTime = {
        month: req.query.month,
        day: req.query.day,
        year: req.query.year,
        hour: req.query.hour,
        minute: req.query.minute,
        timeZone: req.query.timeZone
    };

    let location = {
        lat: req.query.lat,
        lon: req.query.lon
    };
    let response = ephemeris.getEphemeris(birthDateAndTime, location);

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