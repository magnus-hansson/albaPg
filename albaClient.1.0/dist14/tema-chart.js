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
                    this.timeline = null;
                }

                PlanChart.prototype.dumpdata = function dumpdata() {
                    console.log(this.activities);
                };

                PlanChart.prototype.attached = function attached() {
                    var _this = this;

                    var container = document.getElementById('visualization');

                    var options = {
                        template: function template(item) {
                            return '<b>' + item.tripName + '</b><br/>' + item.group;
                        },
                        editable: {
                            add: false,
                            updateTime: false,
                            updateGroup: true,
                            remove: false },
                        onMove: function onMove(item, callback) {
                            console.log('move trip', item.tripName, moment(item.start).format('YYYY-MM-DD'), moment(item.end).format('YYYY-MM-DD'), 'to guide with id:', item.group);
                            var updatedItem = _this.activities.find(function (itm) {
                                return itm.id == item.id;
                            });
                            updatedItem.group = item.group;
                            updatedItem.dirty = true;
                            console.log(_this.activities);
                            item.start = moment(item.start).format('YYYY-MM-DD HH:mm');
                            item.end = moment(item.end).format('YYYY-MM-DD HH:mm');
                            item.starttime = moment(item.start).format('HH:mm');
                            item.endtime = moment(item.end).format('HH:mm');

                            callback(item);
                        }
                    };

                    var groups = [{ id: 0, content: 'Unassigned' }, { id: 14, content: 'Agneta Wåxberg' }, { id: 4, content: 'Sinikka Veivo' }];

                    this.apiService.getTrips().then(function (res) {
                        console.log('feed', res);
                        _this.activities = res;

                        _this.apiService.getGuides().then(function (guides) {

                            var groups2 = guides.map(function (g) {
                                return { id: g.id, content: g.name };
                            });

                            var timeline = new vis.Timeline(container);
                            timeline.setOptions(options);
                            timeline.setGroups(groups2);
                            timeline.setItems(_this.activities);
                            _this.timeline = timeline;
                        });
                    });
                };

                return PlanChart;
            }()) || _class));

            _export('PlanChart', PlanChart);
        }
    };
});
//# sourceMappingURL=tema-chart.js.map
