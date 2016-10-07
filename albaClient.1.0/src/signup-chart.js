import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
import {ApiService} from './services/apiService';
import moment from 'moment';
import vis from  'vis';
import 'vis/dist/vis.css!';
import io from "socket.io-client"
import {AppSettings} from './infrastructure/app-settings'


@inject(ApiService, BindingEngine, AppSettings, vis)
export class SignupChart {
    constructor(apiService, bindingEngine, appSettings) {
        this.apiService = apiService;
        this.activities = [];
        this.appSettings = appSettings;
        this.timeline = null;
        this.athlete = null;
        this.dataSet = new vis.DataSet({ fieldId: "_id" });
        
        if (this.appSettings.useServer == true) {
            var socket = io('http://localhost:3020');

            socket.on('inserted', (data) => {
                console.log(data);

                data.del.forEach((a) => {
                    console.log(this.activitiesflat);
                    console.log(a.activityid)
                    let decreaseThisActivity = this.activities.find(x => x.id === Number.parseInt(a.activityid));
                    decreaseThisActivity.functionaries = Number.parseInt(decreaseThisActivity.functionaries) - 1;
                    console.log(decreaseThisActivity);
                });

                let objToUpdate = this.activities.find(x => x.id === data.add);
                objToUpdate.functionaries = Number.parseInt(objToUpdate.functionaries) + 1;
                console.log('add one signed up func for activity with id:', data.add, objToUpdate);
            });
        }
    }

    signup(activityId, athlete) {
        this.apiService.signUp(activityId, athlete)
            .then(_ => {
                this.athlete.recentactivity = activityId;
            });
    }

    activate(params, route, navigationInstruction) {
        let gymnastId = navigationInstruction.params.childRoute;
        console.log(navigationInstruction.params.childRoute);
        this.gymnastId = navigationInstruction.params.childRoute;
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

        this.timeline = new vis.Timeline(container);
        this.timeline.setOptions(options);
        this.timeline.on('click', (properties) => {
            if (properties.what === 'item') {
                console.log('signing up for event id = ', properties.item);
                this.signup(properties.item, this.athlete);
            }
        });

        return this.apiService.getAthleteById(this.gymnastId)
            .then((res) => {
                console.log('response', res);
                this.athlete = res;
                this.apiService.getActivities2()
                .then((res) => {
                    console.log(res);
                    this.activities = res;
                    this.dataSet.add(this.activities);
                    this.timeline.setItems(this.dataSet);
                    this.timeline.setSelection(this.athlete.recentactivity);
                })
            })
    }
}