import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
@inject(DialogController,  BindingEngine)
export class NewActivity {
    constructor(controller,  bindingEngine) {
         this.controller = controller;
         this.start = "";
         this.end = "";
         this.name = "Bär tunga grejer";
         this.location = "Jg hallen";
    }

    activate(model){
        if(model){
            console.log('this is the shit they give me',model);
            this.name = model.name;
            this.location = model.location;
            this.start = model.start;
            this.end = model.end;
        }

        console.log('activate');
    }
}