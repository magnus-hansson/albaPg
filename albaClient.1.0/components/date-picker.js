import {inject, customElement, bindable} from 'aurelia-framework';
import moment from 'moment';
import {datepicker} from 'eonasdan/bootstrap-datetimepicker';
import 'eonasdan/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css!';

@inject(Element)
export class DatePicker {

    @bindable format = "YYYY-MM-DD";
    @bindable value;

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.datePicker = $(this.element)
            .find('.input-group.date')
            .datetimepicker({
                format: this.format,
                showClose: true,
                showTodayButton: true,
                sideBySide : true
            });

        this.datePicker.on("dp.change", (e) => {
            this.value = moment(e.date).format(this.format);
        });
    }
}