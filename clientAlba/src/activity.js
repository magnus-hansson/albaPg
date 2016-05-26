import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
import {ApiService} from './services/apiService';

@inject(ApiService, BindingEngine)
export class Activity {
    constructor(apiService, bindingEngine, ) {
        this.apiService = apiService;

        this.activities = [];
        this.selected = null;

        this.temp = [];
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

        /*
                this.temp.push({ date: '2016-01-01', name: 'Fotboll', numberofpersons:"12" });
                this.temp.push({ date: '2016-01-01', name: 'Gotboll', numberofpersons:"22" });
                this.temp.push({ date: '2016-01-02', name: 'Pingpång', numberofpersons:"1" });
                this.temp.push({ date: '2016-01-03', name: 'Gång', numberofpersons:"2" });
                this.temp.push({ date: '2016-01-03', name: 'Stå på Spång', numberofpersons:"3" });
        
                
                
                let key = 'date';
                let a = this.temp.reduce(function (rv, x) {
                    let stop ="";
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
                
                let arr = Object.keys(a).map(key => a[key])
                
                let barr = Object.keys(a).map(key => {
                    let dat = {};
                    dat.date = key;
                    dat.act = a[key];
                    return dat;
                })
             */
        // var dfa ="";


    }
}