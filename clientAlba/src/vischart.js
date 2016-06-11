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

    aDialog(callback) {
        //console.log('callback', callback);
        this.dialogService.open({ viewModel: 'components/newactivity' }).then(response => {
            if (!response.wasCancelled) {
                console.log('New activity - ', response.output);
                let res = response.output;
                
               //this.activities.push({start:res.start,end:res.end, name: res.name,location:res.location});
               
                callback({start:res.start,end:res.end, name: res.name,location:res.location});
            } else {
                console.log('Cancel');
            }

        });

    }

/*
 {name: "1221", location: "123212", from: "2016-02-01 10:00", to: "2016-02-11 15:00"}
beskrivning : "Sleva upp spagetti"
datum : "2016-05-26T00:00:00.000Z"
datum2 : "2016-05-26"
end:"2016-05-26 15:00"
endtime:"15:00"
functionaries:"1"
id:4
location:"Vittraskolan"
name:"Bespisningx"
numberofpersons:"6"
start:"2016-05-26 11:00"
starttime:"11:00"
*/

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
                //this.aDialog('Add item', 'Enter text content for new item:', item.content, function (value) {
                this.aDialog(function (value) {
                    if (value) {
                        //console.log('return from dialog',value);
                        
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