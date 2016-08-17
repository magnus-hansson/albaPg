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

        if (this.appSettings.useServer == true) {
            var socket = io('http://localhost:3010');

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

        timeline.on('click',  (properties) => {
            if (properties.what === 'item') {
                console.log('signing up for event id = ', properties.item);
                this.signup(this.gymnastId, properties.item);
            }
        });
    }
}