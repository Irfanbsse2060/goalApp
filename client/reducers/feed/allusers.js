import * as ActionTypes from '../../actions'


export default function allUsers(state = "", action){
    const {payload} = action
    switch (action.type) {

        case ActionTypes.FETCH_ALL_USERS_SUCCESS: {
            return action.payload.allusers;
        }
        default: {
            return state
        }
    }
}