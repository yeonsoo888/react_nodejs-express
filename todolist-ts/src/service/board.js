import axios from 'axios';

export class BoardServ {
    constructor() {
        this.option = {
            credentials: 'include',
        }
    };

    async fetchBoard(method,url,data) {
        return await axios({
            method: method,
            url: url,
            data: data,
        },this.option);
    };
}
