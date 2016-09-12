import {ApiService} from './services/apiService';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(ApiService)
export class Test {
    heading = 'TestPage';
    users = [];

    constructor(apiService) {
        this.apiService = apiService;
    }

    activate() {
        this.apiService.getAthletes()
            .then((res) => {
                console.log('athletes', res);
            });
    }
}
