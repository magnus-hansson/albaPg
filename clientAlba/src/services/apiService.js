import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {AppSettings} from '../infrastructure/app-settings'
import io from "socket.io-client"
var socket = io('http://localhost:3001');
@inject(HttpClient, AppSettings)
export class ApiService {

    constructor(http, appSettings) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(appSettings.api)
                .withDefaults({
                    //credentials: 'include'
                });
        });
        this.http = http;
        
         socket.on('connect', function (data) {
            //socket.emit('join', 'Hello World from client');
            console.log("connected");
        });
             
         socket.on('inserted', function (data) {
            console.log('someone inserted shits', data);
        });
    }

    getActivities() {
        this.isRequesting = true;
        return this.http.fetch('activities')
            .then(response => response.json())
            .then(data => {
                this.isRequesting = false;
                return data;
            });
    }
    
    signUp(activityId, gymnastId){
        let obj = {};
        obj.gid = gymnastId;
        obj.aid = activityId;
        return this.http.fetch('signup', { method: 'post', body: json(obj) });
    }

    putOrPost(phrase) {
        //kolla om vi ska posta eller putta
        if (phrase.id == null) {
            return this.http.fetch('phrase', { method: 'put', body: json(phrase) });
        } else {
            return this.http.fetch('phrase/update', { method: 'post', body: json(phrase) });
        }
    }

    delete(id) {
        return this.http.fetch('phrase/' + id, { method: 'delete' });
    }
}