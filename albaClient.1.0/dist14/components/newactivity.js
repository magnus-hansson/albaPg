'use strict';

System.register(['aurelia-dialog', 'aurelia-framework', 'aurelia-binding'], function (_export, _context) {
    "use strict";

    var DialogController, inject, BindingEngine, _dec, _class, NewActivity;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaDialog) {
            DialogController = _aureliaDialog.DialogController;
        }, function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaBinding) {
            BindingEngine = _aureliaBinding.BindingEngine;
        }],
        execute: function () {
            _export('NewActivity', NewActivity = (_dec = inject(DialogController, BindingEngine), _dec(_class = function () {
                function NewActivity(controller, bindingEngine) {
                    _classCallCheck(this, NewActivity);

                    this.controller = controller;
                    this.start = "";
                    this.end = "";
                    this.name = "Bär tunga grejer";
                    this.location = "Jg hallen";
                }

                NewActivity.prototype.activate = function activate(model) {
                    if (model) {
                        console.log('this is the shit they give me', model);
                        this.name = model.name;
                        this.location = model.location;
                        this.start = model.start;
                        this.end = model.end;
                    }

                    console.log('activate');
                };

                return NewActivity;
            }()) || _class));

            _export('NewActivity', NewActivity);
        }
    };
});
//# sourceMappingURL=newactivity.js.map
