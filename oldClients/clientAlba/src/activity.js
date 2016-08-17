import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
import {ApiService} from './services/apiService';
import {AppSettings} from './infrastructure/app-settings'
import io from "socket.io-client"
import moment from 'moment';

@inject(ApiService, BindingEngine, AppSettings)
export class Activity {
    constructor(apiService, bindingEngine, appSettings) {
        this.apiService = apiService;

        this.activities = [];
        this.selected = null;
        this.activitiesflat = [];
        this.temp = [];
        this.gymnastId = null;
        this.gymnastName = null;
        this.server = false;
        this.appSettings = appSettings;

        if (this.appSettings.useServer == true) {
            var socket = io('http://localhost:3010');

            socket.on('inserted', (data) => {
                console.log(data);

                data.del.forEach((a) => {
                    console.log(this.activitiesflat);
                    console.log(a.activityid)
                    let decreaseThisActivity = this.activitiesflat.find(x => x.id === Number.parseInt(a.activityid));
                    decreaseThisActivity.functionaries = Number.parseInt(decreaseThisActivity.functionaries) - 1;
                    console.log(decreaseThisActivity);
                });

                let objToUpdate = this.activitiesflat.find(x => x.id === data.add);
                objToUpdate.functionaries = Number.parseInt(objToUpdate.functionaries) + 1;
                console.log('add one signed up func for activity with id:', data.add, objToUpdate);
            });
        }
    }

    groupByDate(activities) {
        let key = 'datum2';
        let activityObject = activities.reduce(function (rv, x) {
            let stop = "";
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});

        let activityArrayByDate = Object.keys(activityObject).map(key => {
            let dat = {};
            dat.date = key;
            dat.activity = activityObject[key];
            return dat;
        });
        return activityArrayByDate;
    }

    selectActivity(activity) {
        console.log('selected activity', activity);
        let activityId = activity.id;
        let gymnastId = this.gymnastId;
        this.apiService.signUp(activityId, gymnastId)
            .then((res) => {
                let emitThis = {};
            });
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
                this.activitiesflat = [];
            })
            .then(this.apiService.getActivities()
                .then((res) => {
                    this.activities = this.groupByDate(res);
                    this.activitiesflat = res;
                    console.log(res);
                })
            );
    }
}