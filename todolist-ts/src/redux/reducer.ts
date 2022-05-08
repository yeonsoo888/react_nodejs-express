import { combineReducers } from "redux";

interface action {
    type?:string,
    payload? : {
        mail?: string,
    },
}

const memberReducer = (state:{} = {member:{}}, action: action) => {
    switch (action.type) {
        case "loginMember" :
            return {...state, member:action.payload};
        case "logoutMember" :
            return {...state, member: {}};
        default : 
            return state;
    }
}

const reducers = combineReducers({
    memberReducer,
})

export default reducers