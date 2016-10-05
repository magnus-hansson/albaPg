'use strict';

System.register(['./services/apiService', 'aurelia-framework', 'aurelia-fetch-client', 'fetch'], function (_export, _context) {
    "use strict";

    var ApiService, inject, HttpClient, _dec, _class, Test;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_servicesApiService) {
            ApiService = _servicesApiService.ApiService;
        }, function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaFetchClient) {
            HttpClient = _aureliaFetchClient.HttpClient;
        }, function (_fetch) {}],
        execute: function () {
            _export('Test', Test = (_dec = inject(ApiService), _dec(_class = function () {
                function Test(apiService) {
                    _classCallCheck(this, Test);

                    this.heading = 'TestPage';
                    this.users = [];

                    this.apiService = apiService;
                }

                Test.prototype.activate = function activate() {
                    this.apiService.getAthletes().then(function (res) {
                        console.log('athletes', res);
                    });
                };

                return Test;
            }()) || _class));

            _export('Test', Test);
        }
    };
});
//# sourceMappingURL=test.js.map
