import axios from "axios"

export class Member {
    constructor() {
        this.option = {
            credentials: 'include',
        }
    }

    login = async (method,url,data) => {
        return await axios({
            method: method,
            url: url,
            data: data,
        },this.option)
    } 
}