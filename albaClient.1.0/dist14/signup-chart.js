'use strict';

System.register(['aurelia-framework', 'aurelia-binding', './services/apiService', 'moment', 'vis', 'vis/dist/vis.css!', 'socket.io-client', './infrastructure/app-settings'], function (_export, _context) {
    "use strict";

    var inject, BindingEngine, ApiService, moment, vis, io, AppSettings, _dec, _class, SignupChart;

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
        }, function (_moment) {
            moment = _moment.default;
        }, function (_vis) {
            vis = _vis.default;
        }, function (_visDistVisCss) {}, function (_socketIoClient) {
            io = _socketIoClient.default;
        }, function (_infrastructureAppSettings) {
            AppSettings = _infrastructureAppSettings.AppSettings;
        }],
        execute: function () {
            _export('SignupChart', SignupChart = (_dec = inject(ApiService, BindingEngine, AppSettings, vis), _dec(_class = function () {
                function SignupChart(apiService, bindingEngine, appSettings) {
                    var _this = this;

                    _classCallCheck(this, SignupChart);

                    this.apiService = apiService;
                    this.activities = [];
                    this.appSettings = appSettings;
                    this.timeline = null;
                    this.athlete = null;
                    this.dataSet = new vis.DataSet({ fieldId: "_id" });

                    if (this.appSettings.useServer == true) {
                        var socket = io('http://localhost:3020');

                        socket.on('inserted', function (data) {
                            console.log(data);
                            if (data.del != 'undefined') {
                                console.log('old activity', data.del, 'find and increase functionaries number by one');
                                var decreaseThisActivity = _this.activities.find(function (x) {
                                    return x._id === data.del;
                                });
                                decreaseThisActivity.functionaries = Number.parseInt(decreaseThisActivity.functionaries) - 1;
                                console.log(decreaseThisActivity);
                            }


                            var objToUpdate = _this.activities.find(function (x) {
                                return x._id === data.add;
                            });
                            objToUpdate.functionaries = Number.parseInt(objToUpdate.functionaries) + 1;
                            console.log('add one signed up func for activity with id:', data.add, objToUpdate);
                        });
                    }
                }

                SignupChart.prototype.signup = function signup(activityId, athlete) {
                    var _this2 = this;

                    this.apiService.signUp(activityId, athlete).then(function (_) {
                        _this2.athlete.recentactivity = activityId;
                    });
                };

                SignupChart.prototype.activate = function activate(params, route, navigationInstruction) {
                    var gymnastId = navigationInstruction.params.childRoute;
                    console.log(navigationInstruction.params.childRoute);
                    this.gymnastId = navigationInstruction.params.childRoute;
                };

                SignupChart.prototype.attached = function attached() {
                    var _this3 = this;

                    var container = document.getElementById('visualization');

                    var options = {
                        template: function template(item) {
                            return '<div><b>' + item.name + '</b><br/>' + item.location + '<br/>' + '<small>' + item.starttime + ' -- ' + item.endtime + '</small></div>';
                        },
                        editable: {
                            add: false,
                            updateTime: false,
                            updateGroup: false,
                            remove: false }
                    };

                    this.timeline = new vis.Timeline(container);
                    this.timeline.setOptions(options);
                    this.timeline.on('click', function (properties) {
                        if (properties.what === 'item') {
                            console.log('signing up for event id = ', properties.item);
                            _this3.signup(properties.item, _this3.athlete);
                        }
                    });

                    return this.apiService.getAthleteById(this.gymnastId).then(function (res) {
                        console.log('response', res);
                        _this3.athlete = res;
                        _this3.apiService.getActivities2().then(function (res) {
                            console.log(res);
                            _this3.activities = res;
                            _this3.dataSet.add(_this3.activities);
                            _this3.timeline.setItems(_this3.dataSet);
                            _this3.timeline.setSelection(_this3.athlete.recentactivity);
                        });
                    });
                };

                return SignupChart;
            }()) || _class));

            _export('SignupChart', SignupChart);
        }
    };
});
//# sourceMappingURL=signup-chart.js.map
