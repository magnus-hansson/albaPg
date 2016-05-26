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

        this.temp = [];

        socket.on('inserted', function (data) {
            console.log(data);
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

                let fil = this.groupByDate(res);
                this.activities = fil;
                console.log(fil);
            });
    }
}