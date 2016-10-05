'use strict';

System.register(['aurelia-framework', 'aurelia-binding', './services/apiService', 'moment', 'vis', 'vis/dist/vis.css!', 'aurelia-dialog'], function (_export, _context) {
    "use strict";

    var inject, BindingEngine, ApiService, moment, vis, DialogService, _dec, _class, PlanChart;

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
        }, function (_visDistVisCss) {}, function (_aureliaDialog) {
            DialogService = _aureliaDialog.DialogService;
        }],
        execute: function () {
            _export('PlanChart', PlanChart = (_dec = inject(ApiService, BindingEngine, DialogService, vis), _dec(_class = function () {
                function PlanChart(apiService, bindingEngine, dialogService) {
                    _classCallCheck(this, PlanChart);

                    this.apiService = apiService;
                    this.activities = [];
                    this.dialogService = dialogService;
                }

                PlanChart.prototype.aDialog = function aDialog(callback, model) {
                    model.start = moment(model.start).format('YYYY-MM-DD HH:mm');
                    model.end = moment(model.end).format('YYYY-MM-DD HH:mm');
                    model.starttime = moment(model.start).format('HH:mm');
                    model.endtime = moment(model.end).format('HH:mm');
                    this.dialogService.open({ viewModel: 'components/newactivity', model: model }).then(function (response) {
                        if (!response.wasCancelled) {
                            console.log('New activity - ', response.output);
                            var res = response.output;
                            var startTime = moment(res.start).format('HH:mm');
                            var endTime = moment(res.end).format('HH:mm');

                            callback({ start: res.start, end: res.end, name: res.name, location: res.location, starttime: startTime, endtime: endTime });
                        } else {
                            console.log('Cancel');
                        }
                    });
                };

                PlanChart.prototype.attached = function attached() {
                    var _this = this;

                    var container = document.getElementById('visualization');

                    var options = {
                        template: function template(item) {
                            return '<b>' + item.name + '</b><br/>' + item.location + '<br/>' + '<small>' + item.starttime + ' -- ' + item.endtime + '</small>';
                        },
                        editable: {
                            add: true,
                            updateTime: true,
                            updateGroup: true,
                            remove: true },
                        onAdd: function onAdd(item, callback) {

                            _this.aDialog(function (value) {
                                if (value) {
                                    console.log('return from dialog', value);

                                    item.content = value;
                                    console.log(value);
                                    callback(value);
                                } else {
                                    callback(null);
                                }
                            }, null);
                        },
                        onMove: function onMove(item, callback) {
                            var title = 'Do you really want to move the item to\n' + 'start: ' + item.start + '\n' + 'end: ' + item.end + '?';
                            item.start = moment(item.start).format('YYYY-MM-DD HH:mm');
                            item.end = moment(item.end).format('YYYY-MM-DD HH:mm');
                            item.starttime = moment(item.start).format('HH:mm');
                            item.endtime = moment(item.end).format('HH:mm');

                            callback(item);
                        },
                        onUpdate: function onUpdate(item, callback) {
                            _this.aDialog(function (value) {
                                if (value) {
                                    console.log('return from dialog', value);

                                    item.content = value;
                                    console.log(value);
                                    callback(value);
                                } else {
                                    callback(null);
                                }
                            }, item);
                        }
                    };

                    this.apiService.getActivities().then(function (res) {
                        console.log('feed', res);
                        _this.activities = res;
                        var timeline = new vis.Timeline(container);
                        timeline.setOptions(options);

                        timeline.setItems(_this.activities);
                    });
                };

                return PlanChart;
            }()) || _class));

            _export('PlanChart', PlanChart);
        }
    };
});
//# sourceMappingURL=plan-chart.js.map
