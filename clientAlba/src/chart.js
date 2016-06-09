import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
import {ApiService} from './services/apiService';
import moment from 'moment';

@inject(ApiService, BindingEngine)
export class Chart {
    constructor(apiService, bindingEngine) {
        this.apiService = apiService;
        this.activities = ['arne'];
    }


    kalle() {
        console.log(this.activities);
    }

    drawChart(data) {
        var container = document.getElementById('timeline');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();
        console.log(data);
        dataTable.addColumn({
            type: 'string',
            id: 'President'
        });
        dataTable.addColumn({
            type: 'date',
            id: 'Start'
        });
        dataTable.addColumn({
            type: 'date',
            id: 'End'
        });
        dataTable.addRows(data);
        // dataTable.addRows([
        //     ['Flytt', new Date(2016, 7, 7, 2, 0), new Date(2016, 7, 7, 7, 0)],
        //     ['Café', new Date(2016, 7, 7, 6, 0), new Date(2016, 7, 7, 13, 0)],
        //     ['Städ', new Date(2016, 7, 7, 12, 0), new Date(2016, 7, 7, 17, 0)],
        //     ['Städ', new Date(2016, 7, 8, 12, 0), new Date(2016, 7, 8, 17, 0)]
        // ]);
        var options = {
            timeline: {
                groupByRowLabel: true
            }
        };

        // function selectHandler() {
        //     var selectedItem = this.chart.getSelection()[0];
        //     if (selectedItem) {

        //         var value = dataTable.getValue(selectedItem.row, 0);
        //         console.log('The user selected ' + value);
        //     }
        // }

        // google.visualization.events.addListener(chart, 'select', selectHandler);
        chart.draw(dataTable, options);

    }
    activate() {

        this.apiService.getActivities()
            .then((res) => {
                this.activities = res;
                //console.log(res[0]);
                let arr = res.map(act => {
                    let name = act.name;
                    let starttime = new Date(act.startdatetime);
                    //let starttime = new Date(moment(act.startdatetime).format('YYYY-MM-DD HH:mm'));
                    let endtime = new Date(act.enddatetime);
                    //let endtime = new Date(moment(act.enddatetime).format('YYYY-MM-DD HH:mm'));
                    let retArray = [];
                    retArray.push(name);
                    retArray.push(starttime);
                    retArray.push(endtime);
                    return retArray
                });
                //this.activities = arr;
                //this.kalle();
                //console.log(arr)
                google.charts.load('current',
                    {
                        'packages': ['timeline']
                    });

                google.charts.setOnLoadCallback(() => { this.drawChart(arr) });
            });
    }
}