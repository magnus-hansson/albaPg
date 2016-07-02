import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
import {ApiService} from './services/apiService';
import moment from 'moment';
import vis from  'vis';
import 'vis/dist/vis.css!';


@inject(ApiService, BindingEngine, vis)
export class SignupChart {
    constructor(apiService, bindingEngine) {
        this.apiService = apiService;
        this.activities = [];


    }

    aDialog(callback, model) {
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

    signup(activityId, gymnastId) {
        this.apiService.signUp(activityId, gymnastId);
    }

    activate(params, route, navigationInstruction) {
        let gymnastId = navigationInstruction.params.childRoute;
        console.log(navigationInstruction.params.childRoute);
        this.gymnastId = navigationInstruction.params.childRoute;
        //todo: verify that gymnastId maps to known gymnast
        return this.apiService.getUserById(this.gymnastId)
            .then((res) => {
                console.log('response', res);
                this.gymnastName = res.name;
               
            })
            .then(this.apiService.getActivities()
                .then((res) => {
                    this.activities = res;
                    
                    console.log(this.activities);
                })
            );
    }

    attached() {

        var container = document.getElementById('visualization');

        // Configuration for the Timeline
        var options = {
            template: (item) => {
                return '<div><b>' + item.name + '</b><br/>'
                    + item.location + '<br/>'
                    + '<small>' + item.starttime + ' -- ' + item.endtime + '</small></div>';
            },
            editable: {
                add: false,         // add new items by double tapping
                updateTime: false,  // drag items horizontally
                updateGroup: false, // drag items from one group to another
                remove: false       // delete an item by tapping the delete button top right
            },
        };

                var timeline = new vis.Timeline(container);
                timeline.setOptions(options);
                //timeline.setGroups(groups);
                timeline.setItems(this.activities);

                timeline.on('click', function (properties) {
                    if (properties.what === 'item') {
                        console.log('signing up for event id = ', properties);
                    }
                });

        // this.apiService.getActivities()
        //     .then((res) => {
        //         console.log(res);
        //         this.activities = res;
        //         var timeline = new vis.Timeline(container);
        //         timeline.setOptions(options);
        //         //timeline.setGroups(groups);
        //         timeline.setItems(this.activities);

        //         timeline.on('click', function (properties) {
        //             if (properties.what === 'item') {
        //                 console.log('signing up for event id = ', properties);
        //             }
        //         });
        //     });
    }
}