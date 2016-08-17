export class AppSettings {
    
    constructor() {
        this.baseUrl = "http://localhost:3010";
        this.api = this.baseUrl + '/api/v1/';
        this.useServer = false;
    }
    
}