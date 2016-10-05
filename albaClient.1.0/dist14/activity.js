'use strict';

System.register(['aurelia-framework', 'aurelia-binding', './services/apiService', './infrastructure/app-settings', 'socket.io-client', 'moment'], function (_export, _context) {
    "use strict";

    var inject, BindingEngine, ApiService, AppSettings, io, moment, _dec, _class, Activity;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaBinding) {
            BindingEngine = _aureliaBinding.BindingEngine;
        }, function (_servicesApiService) {
            ApiService = _servicesApiService.ApiService;
        }, function (_infrastructureAppSettings) {
            AppSettings = _infrastructureAppSettings.AppSettings;
        }, function (_socketIoClient) {
            io = _socketIoClient.default;
        }, function (_moment) {
            moment = _moment.default;
        }],
        execute: function () {
            _export('Activity', Activity = (_dec = inject(ApiService, BindingEngine, AppSettings), _dec(_class = function () {
                function Activity(apiService, bindingEngine, appSettings) {
                    var _this = this;

                    _classCallCheck(this, Activity);

                    this.apiService = apiService;

                    this.activities = [];
                    this.selected = null;
                    this.activitiesflat = [];
                    this.temp = [];
                    this.gymnastId = null;
                    this.gymnastName = null;
                    this.server = false;
                    this.appSettings = appSettings;

                    if (this.appSettings.useServer == true) {
                        var socket = io('http://localhost:3020');

                        socket.on('inserted', function (data) {
                            console.log(data);

                            data.del.forEach(function (a) {
                                console.log(_this.activitiesflat);
                                console.log(a.activityid);
                                var decreaseThisActivity = _this.activitiesflat.find(function (x) {
                                    return x.id === Number.parseInt(a.activityid);
                                });
                                decreaseThisActivity.functionaries = Number.parseInt(decreaseThisActivity.functionaries) - 1;
                                console.log(decreaseThisActivity);
                            });

                            var objToUpdate = _this.activitiesflat.find(function (x) {
                                return x.id === data.add;
                            });
                            objToUpdate.functionaries = Number.parseInt(objToUpdate.functionaries) + 1;
                            console.log('add one signed up func for activity with id:', data.add, objToUpdate);
                        });
                    }
                }

                Activity.prototype.groupByDate = function groupByDate(activities) {
                    var key = 'datum2';
                    var activityObject = activities.reduce(function (rv, x) {
                        var stop = "";
                        (rv[x[key]] = rv[x[key]] || []).push(x);
                        return rv;
                    }, {});

                    var activityArrayByDate = Object.keys(activityObject).map(function (key) {
                        var dat = {};
                        dat.date = key;
                        dat.activity = activityObject[key];
                        return dat;
                    });
                    return activityArrayByDate;
                };

                Activity.prototype.selectActivity = function selectActivity(activity) {
                    console.log('selected activity', activity);
                    var activityId = activity.id;
                    var gymnastId = this.gymnastId;
                    this.apiService.signUp(activityId, gymnastId).then(function (res) {
                        var emitThis = {};
                    });
                };

                Activity.prototype.activate = function activate(params, route, navigationInstruction) {
                    var _this2 = this;

                    var gymnastId = navigationInstruction.params.childRoute;
                    console.log(navigationInstruction.params.childRoute);
                    this.gymnastId = navigationInstruction.params.childRoute;

                    return this.apiService.getUserById(this.gymnastId).then(function (res) {
                        console.log('response', res);
                        _this2.gymnastName = res.name;
                        _this2.activitiesflat = [];
                    }).then(this.apiService.getActivities().then(function (res) {
                        _this2.activities = _this2.groupByDate(res);
                        _this2.activitiesflat = res;
                        console.log(res);
                    }));
                };

                return Activity;
            }()) || _class));

            _export('Activity', Activity);
        }
    };
});
//# sourceMappingURL=activity.js.map
