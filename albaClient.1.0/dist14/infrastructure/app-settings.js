"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var AppSettings;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("AppSettings", AppSettings = function AppSettings() {
                _classCallCheck(this, AppSettings);

                this.baseUrl = "http://localhost:3020";
                this.api = this.baseUrl + '/api/';
                this.useServer = true;
            });

            _export("AppSettings", AppSettings);
        }
    };
});
//# sourceMappingURL=app-settings.js.map
