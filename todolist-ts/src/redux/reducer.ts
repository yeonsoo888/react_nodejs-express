import { combineReducers } from "redux";

interface Action {
    type?:string,
    payload? : {
        mail?: string,
        youtube? : [],
    },
}

const memberReducer = (state:object = {member:{}}, action: Action) => {
    switch (action.type) {
        case "loginMember" :
            return {...state, member:action.payload};
        case "logoutMember" :
            return {...state, member: {}};
        default : 
            return state;
    }
}
const youtubeReducer = (state:object = {youtube:[]}, action: Action) => {
    switch (action.type) {
        case "setYoutube" :
            return {...state, youtube: action.payload};
        default : 
            return state;
    }
}

const reducers = combineReducers({
    memberReducer,
    youtubeReducer,
})

export default reducers