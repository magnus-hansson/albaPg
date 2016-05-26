import {inject} from 'aurelia-framework';
import io from "socket.io-client"
var socket = io('http://localhost:3001');
@inject()
export class Welcome {

    constructor() {
        socket.on('connect', function (data) {
            socket.emit('join', 'Hello World from client');
            console.log("connected");
        });

        socket.on('news', function (data) {
            console.log(data);
        });
        
         socket.on('inserted', function (data) {
            console.log(data);
        });
    }
}
