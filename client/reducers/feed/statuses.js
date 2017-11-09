

import * as ActionTypes from '../../actions'
import { combineReducers } from 'redux'

function isLoading(state = false, action) {
    debugger;
    switch (action.type) {
        case ActionTypes.GET_ALL_STATUSES: {
            return true
        }

        case ActionTypes.GET_ALL_STATUSES_SUCCESS :
        case ActionTypes.GET_ALL_STATUSES_FAILURE: {
            return false
        }
        default: {
            return state
        }
    }
}


function statuses(state = "", action) {
    const {payload} = action
    debugger;
    switch (action.type) {
        case ActionTypes.GET_ALL_STATUSES_SUCCESS: {
            return action.payload.allstatuses;
        }

        default: {
            return state
        }
    }

}

export default combineReducers({
   statuses,isLoading
})

