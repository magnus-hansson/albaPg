import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
@inject(DialogController,  BindingEngine)
export class NewActivity {
    constructor(controller,  bindingEngine) {
         this.controller = controller;
         this.start = "2016-05-27 11:10";
         this.end = "2016-05-27 21:10";
         this.name = "Bär tunga grejer";
         this.location = "Jg hallen";
    }

    activate(){
        console.log('activate');
    }
}