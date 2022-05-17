import axios from "axios";

export class Chatserv {
    constructor() {
        this.option = {
            credentials: 'include',
        }
    }

    chatServ = async (method,url,data) => {
        return await axios({
            method: method,
            url: url,
            data: data
        },this.option);
    };
}