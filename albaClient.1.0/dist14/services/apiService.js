'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', '../infrastructure/app-settings'], function (_export, _context) {
    "use strict";

    var inject, HttpClient, json, AppSettings, _dec, _class, ApiService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaFetchClient) {
            HttpClient = _aureliaFetchClient.HttpClient;
            json = _aureliaFetchClient.json;
        }, function (_infrastructureAppSettings) {
            AppSettings = _infrastructureAppSettings.AppSettings;
        }],
        execute: function () {
            _export('ApiService', ApiService = (_dec = inject(HttpClient, AppSettings), _dec(_class = function () {
                function ApiService(http, appSettings) {
                    _classCallCheck(this, ApiService);

                    http.configure(function (config) {
                        config.useStandardConfiguration().withBaseUrl(appSettings.api).withDefaults({});
                    });
                    this.http = http;
                    this.appSettings = appSettings;
                }

                ApiService.prototype.getActivities2 = function getActivities2() {

                    return this.http.fetch('activity').then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        return data;
                    });
                };

                ApiService.prototype.getActivities = function getActivities() {
                    var _this = this;

                    this.isRequesting = true;

                    if (this.appSettings.useServer == true) {
                        return this.http.fetch('activity').then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            _this.isRequesting = false;
                            return data;
                        });
                    }
                    var json = [{ "id": 4, "name": "Bespisningx", "location": "Vittraskolan", "numberofpersons": "6", "datum": "2016-05-26T00:00:00.000Z", "datum2": "2016-05-26", "beskrivning": "Sleva upp spagetti", "starttime": "11:00", "endtime": "15:00", "start": "2016-05-26 11:00", "end": "2016-05-26 15:00", "functionaries": "1" }, { "id": 1, "name": "Redskapsflytt", "location": "JG-Hallen", "numberofpersons": "12", "datum": "2016-05-26T00:00:00.000Z", "datum2": "2016-05-26", "beskrivning": "Bär mycket, bär tungt", "starttime": "18:00", "endtime": "21:00", "start": "2016-05-26 18:00", "end": "2016-05-26 21:00", "functionaries": "3" }, { "id": 5, "name": "Logivärdx", "location": "Lundsskolan", "numberofpersons": "4", "datum": "2016-05-27T00:00:00.000Z", "datum2": "2016-05-27", "beskrivning": "Ta emot lag som ska övernatta på skolan", "starttime": "17:00", "endtime": "23:00", "start": "2016-05-27 17:00", "end": "2016-05-27 23:00", "functionaries": "1" }, { "id": 6, "name": "Logivärd", "location": "Lundsskolan", "numberofpersons": "2", "datum": "2016-05-27T00:00:00.000Z", "datum2": "2016-05-27", "beskrivning": "Håll ordning under natten", "starttime": "22:45", "endtime": "23:59", "start": "2016-05-27 22:45", "end": "2016-05-27 23:59", "functionaries": "1" }, { "id": 21, "name": "Ackreditering", "location": "Sporthallen", "numberofpersons": "4", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Skriv in lag.", "starttime": "12:00", "endtime": "16:00", "start": "2016-05-28 12:00", "end": "2016-05-28 16:00", "functionaries": "0" }, { "id": 22, "name": "B1espisning1", "location": "Vittraskolan", "numberofpersons": "6", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Servera middag", "starttime": "15:00", "endtime": "19:00", "start": "2016-05-28 15:00", "end": "2016-05-28 19:00", "functionaries": "0" }, { "id": 2, "name": "Funkisfik", "location": "Sporthallen", "numberofpersons": "4", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Koka kaffe", "starttime": "06:00", "endtime": "11:00", "start": "2016-05-28 06:00", "end": "2016-05-28 11:00", "functionaries": "1" }, { "id": 15, "name": "Sekriteriat", "location": "Sporthallen", "numberofpersons": "3", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Sköt ljud, poängvisning och annat som är viktigt.", "starttime": "10:00", "endtime": "15:00", "start": "2016-05-28 10:00", "end": "2016-05-28 15:00", "functionaries": "0" }, { "id": 17, "name": "Städ", "location": "Sporthallen", "numberofpersons": "5", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Städa läktare och toa.", "starttime": "11:00", "endtime": "14:00", "start": "2016-05-28 11:00", "end": "2016-05-28 14:00", "functionaries": "0" }, { "id": 18, "name": "Städ", "location": "Sporthallen", "numberofpersons": "5", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Städa", "starttime": "13:45", "endtime": "20:00", "start": "2016-05-28 13:45", "end": "2016-05-28 20:00", "functionaries": "0" }, { "id": 19, "name": "Ackreditering", "location": "Sporthallen", "numberofpersons": "4", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Skriv in lag", "starttime": "08:00", "endtime": "12:00", "start": "2016-05-28 08:00", "end": "2016-05-28 12:00", "functionaries": "0" }, { "id": 23, "name": "Logivärd", "location": "Lundsskolan", "numberofpersons": "4", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Var en stabil fyr i natten", "starttime": "19:00", "endtime": "23:59", "start": "2016-05-28 19:00", "end": "2016-05-28 23:59", "functionaries": "0" }, { "id": 8, "name": "Logivärd", "location": "Lundsskolan", "numberofpersons": "4", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Fyll på pappershanddukar. Städa grovt ", "starttime": "06:00", "endtime": "12:00", "start": "2016-05-28 06:00", "end": "2016-05-28 12:00", "functionaries": "0" }, { "id": 9, "name": "Sjukvårdare", "location": "Sporthallen", "numberofpersons": "1", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Glassjobb, sitt och löka och hoppas ingen stukar sig.", "starttime": "10:00", "endtime": "13:00", "start": "2016-05-28 10:00", "end": "2016-05-28 13:00", "functionaries": "0" }, { "id": 10, "name": "Redskap - golvet", "location": "Sporthallen", "numberofpersons": "6", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Flytta bord, trampetter och ansatsmatta. Svettas som en gris", "starttime": "09:00", "endtime": "15:00", "start": "2016-05-28 09:00", "end": "2016-05-28 15:00", "functionaries": "0" }, { "id": 12, "name": "Redskap - golvet", "location": "Sporthallen", "numberofpersons": "6", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Flytta bord, trampetter och ansatsmatta. Svettas som en gris", "starttime": "14:45", "endtime": "19:30", "start": "2016-05-28 14:45", "end": "2016-05-28 19:30", "functionaries": "0" }, { "id": 13, "name": "Funkisfik", "location": "Sporthallen", "numberofpersons": "2", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Koka kaffe.", "starttime": "11:00", "endtime": "16:00", "start": "2016-05-28 11:00", "end": "2016-05-28 16:00", "functionaries": "0" }, { "id": 14, "name": "Funkisfik", "location": "Sporthallen", "numberofpersons": "2", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Koka kaffe", "starttime": "15:45", "endtime": "20:00", "start": "2016-05-28 15:45", "end": "2016-05-28 20:00", "functionaries": "0" }, { "id": 16, "name": "Sekriteriat", "location": "Sporthallen", "numberofpersons": "3", "datum": "2016-05-28T00:00:00.000Z", "datum2": "2016-05-28", "beskrivning": "Sköt ljud, poängvisning och annat som är viktigt.", "starttime": "14:45", "endtime": "20:00", "start": "2016-05-28 14:45", "end": "2016-05-28 20:00", "functionaries": "0" }, { "id": 3, "name": "2Bespisning", "location": "Vittraskolan", "numberofpersons": "6", "datum": "2016-05-27T00:00:00.000Z", "datum2": "2016-05-27", "beskrivning": "Skiva bröd och grönsaker", "starttime": "06:00", "endtime": "12:00", "start": "2016-05-27 06:00", "end": "2016-05-28 12:00", "functionaries": "0" }, { "id": 27, "name": "Sjukvårdare", "location": "Sporthallen", "numberofpersons": "1", "datum": "2016-05-29T00:00:00.000Z", "datum2": "2016-05-29", "beskrivning": "Sitt och vänta på benbrott", "starttime": "09:00", "endtime": "12:00", "start": "2016-05-29 09:00", "end": "2016-05-29 12:00", "functionaries": "0" }, { "id": 28, "name": "Redskap - golv", "location": "Sporthallen", "numberofpersons": "6", "datum": "2016-05-29T00:00:00.000Z", "datum2": "2016-05-29", "beskrivning": "Flytta redskap och mattor mellan olika discipliner", "starttime": "08:45", "endtime": "13:00", "start": "2016-05-29 08:45", "end": "2016-05-29 13:00", "functionaries": "0" }, { "id": 24, "name": "Logivärd", "location": "Lundsskolan", "numberofpersons": "2", "datum": "2016-05-29T00:00:00.000Z", "datum2": "2016-05-29", "beskrivning": "Avhys lagen från sina rum, städa yadda yadda", "starttime": "06:00", "endtime": "13:00", "start": "2016-05-29 06:00", "end": "2016-05-29 13:00", "functionaries": "0" }, { "id": 26, "name": "Bespisning", "location": "Vittraskolan", "numberofpersons": "6", "datum": "2016-05-29T00:00:00.000Z", "datum2": "2016-05-29", "beskrivning": "Servera frukost", "starttime": "06:00", "endtime": "11:00", "start": "2016-05-29 06:00", "end": "2016-05-29 11:00", "functionaries": "0" }, { "id": 25, "name": "Sekriteriat", "location": "Sporthallen", "numberofpersons": "3", "datum": "2016-05-29T00:00:00.000Z", "datum2": "2016-05-29", "beskrivning": "Sköt ljud och poängvisning, finalen", "starttime": "09:00", "endtime": "14:00", "start": "2016-05-29 09:00", "end": "2016-05-29 14:00", "functionaries": "0" }, { "id": 29, "name": "Funkisfik", "location": "Sporthallen", "numberofpersons": "2", "datum": "2016-05-29T00:00:00.000Z", "datum2": "2016-05-29", "beskrivning": "Koka kaffe, serva dommare.", "starttime": "08:00", "endtime": "13:00", "start": "2016-05-29 08:00", "end": "2016-05-29 13:00", "functionaries": "0" }, { "id": 30, "name": "Städ", "location": "Sporthallen", "numberofpersons": "4", "datum": "2016-05-29T00:00:00.000Z", "datum2": "2016-05-29", "beskrivning": "Städa grovt efter och under finalen", "starttime": "11:00", "endtime": "14:00", "start": "2016-05-29 11:00", "end": "2016-05-29 14:00", "functionaries": "0" }, { "id": 31, "name": "Redskapsflytt", "location": "Sporthallen", "numberofpersons": "10", "datum": "2016-05-29T00:00:00.000Z", "datum2": "2016-05-29", "beskrivning": "Flytta tillbaka allt till JG-hallen", "starttime": "14:00", "endtime": "18:00", "start": "2016-05-29 14:00", "end": "2016-05-29 18:00", "functionaries": "0" }];

                    var json2 = [{ "_id": "57f631f9a3e60537e03b9e00", "name": "Flytta redskap", "description": "Bära redskap till Sporthallen", "location": "JG hallen och sporthallen", "date": "2016-10-12T00:00:00.000Z", "start": "2016-10-12 8:00", "end": "2016-10-12 10:00", "starttime": "08:00", "endtime": "10:00", "slots": 20, "__v": 0, "athletes": [] }, { "_id": "57f63264a3e60537e03b9e01", "name": "Funkisfik", "description": "Bära godis till dommare", "location": "Sporthallen", "date": "2016-10-12T00:00:00.000Z", "start": "2016-10-12 10:00", "end": "2016-10-12 13:00", "starttime": "10:00", "endtime": "13:00", "slots": 2, "__v": 0, "athletes": [] }];

                    var p = new Promise(function (resolve, reject) {

                        resolve(json2);
                    });
                    return p;
                };

                ApiService.prototype.getGuides = function getGuides() {
                    var json = [{
                        "id": 4,
                        "name": "Agneta Wåxberg"
                    }, {
                        "id": 14,
                        "name": "Arne Fluxbregs"
                    }, {
                        "id": 34,
                        "name": "Anita Ivanov"
                    }, {
                        "id": 0,
                        "name": "Unassigned"
                    }];
                    var p = new Promise(function (resolve, reject) {

                        resolve(json);
                    });
                    return p;
                };

                ApiService.prototype.getTrips = function getTrips() {

                    var json = [{
                        "id": 4,
                        "tripName": "Vandring i Portugal",
                        "start": "2016-05-26",
                        "end": "2016-05-31",
                        "group": 0
                    }, {
                        "id": 14,
                        "tripName": "Istanbul - porten till Asien",
                        "start": "2016-06-01",
                        "end": "2016-06-14",
                        "group": 0
                    }, {
                        "id": 15,
                        "tripName": "Istanbul - porten till Asien",
                        "start": "2016-06-16",
                        "end": "2016-06-23",
                        "group": 0
                    }, {
                        "id": 16,
                        "tripName": "Istanbul - porten till Asien",
                        "start": "2016-06-24",
                        "end": "2016-06-31",
                        "group": 0
                    }, {
                        "id": 34,
                        "tripName": "Kortvecka i Lissabon",
                        "start": "2016-06-03",
                        "end": "2016-06-04",
                        "group": 0

                    }];
                    var p = new Promise(function (resolve, reject) {
                        resolve(json);
                    });
                    return p;
                };

                ApiService.prototype.signUp = function signUp(activityId, athlete) {
                    var _this2 = this;

                    var oldId = athlete.recentactivity;
                    var obj = {};

                    obj.athletes = [athlete._id];


                    if (this.appSettings.useServer == true) {
                        return this.http.fetch('signup/' + activityId + '/' + oldId, { method: 'put', body: json(obj) }).then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            _this2.isRequesting = false;
                            return data;
                        });
                    }
                };

                ApiService.prototype.putOrPost = function putOrPost(phrase) {
                    if (phrase.id == null) {
                        return this.http.fetch('phrase', { method: 'put', body: json(phrase) });
                    } else {
                        return this.http.fetch('phrase/update', { method: 'post', body: json(phrase) });
                    }
                };

                ApiService.prototype.getAthleteById = function getAthleteById(guuid) {
                    return this.http.fetch('athlete/' + guuid, { method: 'get' }).then(function (response) {
                        return response.json();
                    }).then(function (data) {

                        return data;
                    });
                };

                ApiService.prototype.getAthletes = function getAthletes() {
                    var _this3 = this;

                    return this.http.fetch('athlete', { method: 'get' }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        _this3.isRequesting = false;
                        return data;
                    });
                };

                ApiService.prototype.delete = function _delete(id) {
                    return this.http.fetch('phrase/' + id, { method: 'delete' });
                };

                return ApiService;
            }()) || _class));

            _export('ApiService', ApiService);
        }
    };
});
//# sourceMappingURL=apiService.js.map
