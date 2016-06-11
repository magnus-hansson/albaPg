import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
import {ApiService} from './services/apiService';
import moment from 'moment';
import vis from  'vis';
import '../node_modules/vis/dist/vis.css';
import '../node_modules/h-swal/dist/sweetalert.css';
import {DialogService} from 'aurelia-dialog';
import swal from 'h-swal';
@inject(ApiService, BindingEngine, DialogService, vis)
export class VisChart {
    constructor(apiService, bindingEngine, dialogService) {
        this.apiService = apiService;
        this.activities = [];
        this.dialogService = dialogService;
    }

    enfunk() {
        console.log("adfa");
    }

    attached() {

        var container = document.getElementById('visualization');

        var groups = new vis.DataSet([
            { id: 1, content: 'Old' },
            { id: 2, content: 'New' }
        ]);

        // Create a DataSet (allows two way data-binding)
        var items = new vis.DataSet([
            { id: 1, group: 1, content: 'RSHTL179887815', start: '2016-06-03 14:55', end: '2016-06-06 06:15', crew: 'Carlsson, Samuel (CAS)' },
            { id: 2, group: 1, content: 'RSHTL179887822', start: '2016-06-05 02:00', end: '2016-06-05 17:15', crew: 'Åberg, Magnus (ABG)' },
            { id: 3, group: 2, content: 'RSHTL180214045', start: '2016-06-03 09:00', end: '2016-06-05 18:00', crew: 'Name, No (NN)' },
            { id: 4, group: 2, content: 'RSHTL180214044', start: '2016-06-05 02:00', end: '2016-06-06 16:15', crew: 'Carlsson, Samuel (CAS)' }
        ]);

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
            }, onAdd: function (item, callback) {
                prettyPrompt('Add item', 'Enter text content for new item:', item.content, function (value) {
                    if (value) {
                        item.content = value;
                        callback(item); // send back adjusted new item
                    }
                    else {
                        callback(null); // cancel item creation
                    }
                });
            },
        };

        function prettyPrompt(title, text, inputValue, callback) {
            swal({
                title: title,
                text: text,
                type: 'input',
                showCancelButton: true,
                inputValue: inputValue
            }, callback);
        }

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