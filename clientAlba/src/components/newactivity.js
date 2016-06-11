import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
@inject(DialogController,  BindingEngine)
export class NewActivity {
    constructor(controller,  bindingEngine) {
         this.controller = controller;
         this.adate = "2012-01-01";
    }

    activate(){
        console.log('activate');
    }
}