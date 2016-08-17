import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
import {ApiService} from './services/apiService';
import moment from 'moment';
import vis from  'vis';
import 'vis/dist/vis.css!';
import {DialogService} from 'aurelia-dialog';

@inject(ApiService, BindingEngine, DialogService, vis)
export class PlanChart {
    constructor(apiService, bindingEngine, dialogService) {
        this.apiService = apiService;
        this.activities = [];
        this.dialogService = dialogService;
    }

    aDialog(callback, model) {
        model.start = moment(model.start).format('YYYY-MM-DD HH:mm');
        model.end = moment(model.end).format('YYYY-MM-DD HH:mm');
        model.starttime = moment(model.start).format('HH:mm');
        model.endtime = moment(model.end).format('HH:mm');
        this.dialogService.open({ viewModel: 'components/newactivity', model: model }).then(response => {
            if (!response.wasCancelled) {
                console.log('New activity - ', response.output);
                let res = response.output;
                let startTime = moment(res.start).format('HH:mm');
                let endTime = moment(res.end).format('HH:mm');

                callback({ start: res.start, end: res.end, name: res.name, location: res.location, starttime: startTime, endtime: endTime });
            } else {
                console.log('Cancel');
            }
        });
    }

    attached() {

        var container = document.getElementById('visualization');

        // Configuration for the Timeline
        var options = {
            template: function (item) {
                return '<b>' + item.name + '</b><br/>'
                    + item.location + '<br/>'
                    + '<small>' + item.starttime + ' -- ' + item.endtime + '</small>';
            },
            editable: {
                add: true,         // add new items by double tapping
                updateTime: true,  // drag items horizontally
                updateGroup: true, // drag items from one group to another
                remove: true       // delete an item by tapping the delete button top right
            },
            onAdd: (item, callback) => { //function (item, callback) {

                this.aDialog(function (value) {
                    if (value) {
                        console.log('return from dialog', value);

                        item.content = value;
                        console.log(value);
                        callback(value); // send back adjusted new item
                    }
                    else {
                        callback(null); // cancel item creation
                    }
                }, null);
            },
            onMove: (item, callback) => {
                var title = 'Do you really want to move the item to\n' +
                    'start: ' + item.start + '\n' +
                    'end: ' + item.end + '?';
                item.start = moment(item.start).format('YYYY-MM-DD HH:mm');
                item.end = moment(item.end).format('YYYY-MM-DD HH:mm');
                item.starttime = moment(item.start).format('HH:mm');
                item.endtime = moment(item.end).format('HH:mm');

                callback(item); // send back item as confirmation (can be changed)
            },
            onUpdate: (item, callback) => {
                this.aDialog(function (value) {
                    if (value) {
                        console.log('return from dialog', value);

                        item.content = value;
                        console.log(value);
                        callback(value); // send back adjusted new item
                    }
                    else {
                        callback(null); // cancel item creation
                    }
                }, item);
            },
        };

        this.apiService.getActivities()
            .then((res) => {
                console.log('feed', res);
                this.activities = res;
                var timeline = new vis.Timeline(container);
                timeline.setOptions(options);
                //timeline.setGroups(groups);
                timeline.setItems(this.activities);
            });
    }
}