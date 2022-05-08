import { combineReducers } from "redux";

interface action {
    type?:string,
    payload? : {},
}

const memberReducer = (state:{} = {member:{}}, action: action) => {
    switch (action.type) {
        case "loginMember" :
            return {...state, member:action.payload}
        default : 
            return state;
    }
}

const reducers = combineReducers({
    memberReducer,
})

export default reducers