import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
import {ApiService} from './services/apiService';
import moment from 'moment';
import vis from  'vis';
import '../node_modules/vis/dist/vis.css';
@inject(ApiService, BindingEngine, vis)
export class VisChart {
    constructor(apiService, bindingEngine) {
        this.apiService = apiService;

    }

    enfunk() {
        console.log("adfa");
    }

    attached() {

        var container = document.getElementById('visualization');

        var groups = new vis.DataSet([
            { id: 1, content: 'Old' },
            { id: 2, content: 'New' }
        ]);

        // Create a DataSet (allows two way data-binding)
        var items = new vis.DataSet([
            { id: 1, group: 1, content: 'RSHTL179887815', start: '2016-06-03 14:55', end: '2016-06-06 06:15', crew: 'Carlsson, Samuel (CAS)' },
            { id: 2, group: 1, content: 'RSHTL179887822', start: '2016-06-05 02:00', end: '2016-06-05 17:15', crew: 'Åberg, Magnus (ABG)' },
            { id: 3, group: 2, content: 'RSHTL180214045', start: '2016-06-03 09:00', end: '2016-06-05 18:00', crew: 'Name, No (NN)' },
            { id: 4, group: 2, content: 'RSHTL180214044', start: '2016-06-05 02:00', end: '2016-06-06 16:15', crew: 'Carlsson, Samuel (CAS)' }
        ]);

        // Configuration for the Timeline
        var options = {
            template: function (item) {
                return '<b>' + item.content + '</b><br/>'
                    + item.crew + '<br/>'
                    + '<small>' + item.start + ' -- ' + item.end + '</small>';
            }
        };

        var timeline = new vis.Timeline(container);
        timeline.setOptions(options);
        //timeline.setGroups(groups);
        timeline.setItems(items); 
        
    }
}