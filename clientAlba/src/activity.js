import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
import {ApiService} from './services/apiService';
import io from "socket.io-client"
var socket = io('http://localhost:3001');
@inject(ApiService, BindingEngine)
export class Activity {
    constructor(apiService, bindingEngine, ) {
        this.apiService = apiService;

        this.activities = [];
        this.selected = null;
        this.activitiesflat = [];
        this.temp = [];

        socket.on('inserted', (data) => {
            //update event with
            let objToUpdate = this.activitiesflat.find(x => x.id ===  data.add);
            objToUpdate.functionaries =Number.parseInt(objToUpdate.functionaries) +1; 
            console.log('add one signed up func for activity with id:',data.add, objToUpdate);
        });
    }

    groupByDate(activities) {
        let key = 'datum';
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
        let gymnastId = 777;
        this.apiService.signUp(activityId, gymnastId);
    }

    activate() {
        return this.apiService.getActivities()
            .then((res) => {
                //this.activities = res;

                this.activities = this.groupByDate(res);
                //this.activities = fil;
                this.activitiesflat = res;
                console.log(res);
            });
    }
}