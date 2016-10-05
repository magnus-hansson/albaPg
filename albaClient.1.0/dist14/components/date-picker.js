'use strict';

System.register(['aurelia-framework', 'moment', 'eonasdan/bootstrap-datetimepicker', 'eonasdan/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css!'], function (_export, _context) {
    "use strict";

    var inject, customElement, bindable, moment, datepicker, _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, DatePicker;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            customElement = _aureliaFramework.customElement;
            bindable = _aureliaFramework.bindable;
        }, function (_moment) {
            moment = _moment.default;
        }, function (_eonasdanBootstrapDatetimepicker) {
            datepicker = _eonasdanBootstrapDatetimepicker.datepicker;
        }, function (_eonasdanBootstrapDatetimepickerBuildCssBootstrapDatetimepickerMinCss) {}],
        execute: function () {
            _export('DatePicker', DatePicker = (_dec = inject(Element), _dec(_class = (_class2 = function () {
                function DatePicker(element) {
                    _classCallCheck(this, DatePicker);

                    _initDefineProp(this, 'format', _descriptor, this);

                    _initDefineProp(this, 'value', _descriptor2, this);

                    this.element = element;
                }

                DatePicker.prototype.attached = function attached() {
                    var _this = this;

                    this.datePicker = $(this.element).find('.input-group.date').datetimepicker({
                        format: this.format,
                        showClose: true,
                        showTodayButton: true,
                        sideBySide: true
                    });

                    this.datePicker.on("dp.change", function (e) {
                        _this.value = moment(e.date).format(_this.format);
                    });
                };

                return DatePicker;
            }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'format', [bindable], {
                enumerable: true,
                initializer: function initializer() {
                    return "YYYY-MM-DD";
                }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'value', [bindable], {
                enumerable: true,
                initializer: null
            })), _class2)) || _class));

            _export('DatePicker', DatePicker);
        }
    };
});
//# sourceMappingURL=date-picker.js.map
