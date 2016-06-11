import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
import {ApiService} from './services/apiService';
import moment from 'moment';
import vis from  'vis';
import '../node_modules/vis/dist/vis.css';
//import '../node_modules/h-swal/dist/sweetalert.css';
import {DialogService} from 'aurelia-dialog';
//import swal from 'h-swal';


@inject(ApiService, BindingEngine, DialogService, vis)
export class VisChart {
    constructor(apiService, bindingEngine, dialogService) {
        this.apiService = apiService;
        this.activities = [];
        this.dialogService = dialogService;
    }

    aDialog(...param) {
        this.dialogService.open({ viewModel: 'components/newactivity'}).then(response => {
            if (!response.wasCancelled) {
                console.log('Send - ', response.output);

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
                this.aDialog('Add item', 'Enter text content for new item:', item.content, function (value) {
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



        // function prettyPrompt(title, text, inputValue, callback) {
        //     swal({
        //         title: title,
        //         text: text,
        //         type: 'input',
        //         showCancelButton: true,
        //         inputValue: inputValue
        //     }, callback);
        // }

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