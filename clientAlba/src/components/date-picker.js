import moment from 'moment';
import {inject, customElement, bindable} from 'aurelia-framework';
import {datepicker} from 'eonasdan-bootstrap-datetimepicker';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
import $ from 'jquery';

@inject(Element)
export class DatePicker {

    @bindable format = "YYYY-MM-DD";
    @bindable value;

    constructor(element) {
        this.element = element;
    }

    attached() {
        let kalle = datepicker;
        this.datePicker = $(this.element).find('.input-group.date').datetimepicker({
            locale: 'sv',
            format: 'YYYY-MM-DD HH:mm:ss',
        });
        // this.datePicker = $(this.element)
        //     .find('.input-group.date')
        //     .datetimepicker({
        //         format: this.format,
        //         showClose: true,
        //         showTodayButton: true,
        //         sideBySide : true
        //     });

        this.datePicker.on("dp.change", (e) => {
             this.value = e.date.toDate();
            //this.value = moment(e.date).format(this.format);
        });
    }
}