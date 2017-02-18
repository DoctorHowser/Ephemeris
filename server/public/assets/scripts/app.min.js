var myApp = angular.module("myApp", [])

.controller("EphemerisController", ['$scope', '$http', function ($scope, $http) {
    
    $scope.timeZoneOptions = {
        "America/Puerto_Rico" : "Puerto Rico (Atlantic)",
        "America/New_York" : "New York (Eastern)",
        "America/Chicago": "Chicago (Central)",
        "America/Denver": "Denver (Mountain)",
        "America/Phoenix": "Phoenix (MST)",
        "America/Los_Angeles": "Los Angeles (Pacific)",
        "America/Anchorage": "Anchorage (Alaska)",
        "Pacific/Honolulu": "Honolulu (Hawaii)",
        "Europe/London": "London",
        "Europe/Belgrade": "Belgrade",
        "Europe/Dublin": "Dublin",
    }
    
    $scope.dateTime = {
        year : "",
        month : "",
        day : "",
        hour : "",
        minute : "",
        timeZone : ""
    };

    // $scope.lat;
    // $scope.lon;
    $scope.location = {
        lat : "",
        lon : ""
    };

    $scope.timeZone = {}
    
    $scope.result = '';

    $scope.getEphemeris = function () {
        $scope.dateTime.timeZone = $scope.timeZone
        // $scope.location = {
        //     lat : $scope.lat,
        //     lon : $scope.lon
        // }
        console.log($scope.location)
        var queryParams = angular.extend({}, $scope.location, $scope.dateTime)

        $http.get('/ephemeris', {
            params: queryParams
        })
        .then(function(result){
            $scope.result = JSON.stringify(result.data, null, 2);
        })
        .catch(function(result){
            $scope.result = result.data;
        })
    }
    
}])

.directive('locationInput', LocationInput)
.directive('dateTimeInput', DateTimeInput)
.directive('timeZoneInput', TimeZoneInput)


    DateTimeInput.$inject = ['$document'];;
    LocationInput.$inject = ['$document'];
    TimeZoneInput.$inject = ['$document'];

    function LocationInput($document) {

        var template = "<div class='form-group'><label for='inputId'>{{labelText}}</label><input required placeholder='{{inputPlaceholder}}' class='form-control' id='inputId' type='text' ng-model='locationObject'></input></div>"
        
        return {
            template: template,
            scope: {
                locationObject : '=',
                inputId : '@',
                labelText : '@',
                inputPlaceholder : '@'
            },

        }

        
    }

    function DateTimeInput($document) {

        var template = "<div class='form-group'><label for='inputId'>{{labelText}}</label><input required placeholder='{{inputPlaceholder}}' class='form-control' id='inputId' type='text' ng-model='dateTimeObject'></input></div>"
        
        return {
            template: template,
            scope: {
                dateTimeObject : '=',
                inputId : '@',
                labelText : '@',
                inputPlaceholder : '@'
            },

        }

        
    }

    function TimeZoneInput($document) {

        var template = "\
        <div class='form-group'>\
            <label for='inputId'>{{labelText}}</label>\
                <select required ng-options='key as value for (key, value) in timeZoneOptions' class='form-control' id='inputId' type='text' ng-model='timeZoneObject'>\
            </select>\
            </div>"
        
        return {
            template: template,
            scope: {
                timeZoneObject : '=',
                inputId : '@',
                labelText : '@',
                timeZoneOptions : '='
            },

        }

        
    }
    