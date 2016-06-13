import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
import {ApiService} from './services/apiService';
import moment from 'moment';
import vis from  'vis';
import 'vis/dist/vis.css!';
import {DialogService} from 'aurelia-dialog';

@inject(ApiService, BindingEngine, DialogService, vis)
export class VisChart {
    constructor(apiService, bindingEngine, dialogService) {
        this.apiService = apiService;
        this.activities = [];
        this.dialogService = dialogService;
    }

    aDialog(callback) {
        this.dialogService.open({ viewModel: 'components/newactivity' }).then(response => {
            if (!response.wasCancelled) {
                console.log('New activity - ', response.output);
                let res = response.output;
                callback({start:res.start,end:res.end, name: res.name,location:res.location});
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
            }, onAdd: (item, callback) => { //function (item, callback) {
                
                this.aDialog(function (value) {
                    if (value) {
                        console.log('return from dialog',value);
                        
                        item.content = value;
                        console.log(value);
                        //console.log('callback höär', callback);
                        callback(value); // send back adjusted new item
                    }
                    else {
                        callback(null); // cancel item creation
                    }
                });
            },
        };

        this.apiService.getActivities()
            .then((res) => {
                console.log(res);
                this.activities = res;
                var timeline = new vis.Timeline(container);
                timeline.setOptions(options);
                //timeline.setGroups(groups);
                timeline.setItems(res);
            });
    }
}