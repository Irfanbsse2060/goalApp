
/*
import * as ActionTypes from '../../actions'


export default function usergoals(state = "", action){
    const {payload} = action
    debugger;
    switch (action.type) {

        case ActionTypes.FETCH_USER_GOALS_SUCCESS: {
            return action.payload.usergoals;
        }
        default: {
            return state
        }
    }
}
*/



import * as ActionTypes from '../../actions'
import { combineReducers } from 'redux'

function isLoading(state = false, action) {
    debugger;
    switch (action.type) {
        case ActionTypes.FETCH_USER_GOALS: {
            return true
        }

        case ActionTypes.FETCH_USER_GOALS_SUCCESS:
        case ActionTypes.FETCH_USER_GOALS_FAILURE: {
            return false
        }
        default: {
            return state
        }
    }
}


function isAddingOrDeleting(state = false, action) {
    debugger;
    switch (action.type) {
        case ActionTypes.ADD_USER_GOAL:
        case ActionTypes.DELETE_USER_GOAL: {
            return true
        }

        case ActionTypes.DELETE_USER_GOAL_SUCCESS :
        case ActionTypes.DELETE_USER_GOAL_FAILURE :
        case ActionTypes.ADD_USER_GOAL_SUCCESS :
        case ActionTypes.ADD_USER_GOAL_FAILURE : {
            return false
        }
        default: {
            return state
        }
    }
}


function userGoals(state = "", action) {
    const {payload} = action
    debugger;
    switch (action.type) {
        case ActionTypes.FETCH_USER_GOALS_SUCCESS: {
            return action.payload.usergoals;
        }

        case ActionTypes.DELETE_USER_GOAL_SUCCESS :
        case ActionTypes.ADD_USER_GOAL_SUCCESS :
            {
            return {...state, usergoals : payload.goalsOfUser}
        }



        case ActionTypes.ADD_GOAL_TASK_SUCCESS :
        case ActionTypes.DELETE_GOAL_TASK_SUCCESS :
        case ActionTypes.EDIT_GOAL_TASK_DETAIL_SUCCESS :
        {
            const {payload : {goalsOfUser}} = action
            return {...state, usergoals : goalsOfUser }
        }



       case ActionTypes.UPDATE_GOAL_TASK_STATUS: {
           const {taskId,taskStatus,goalId} = payload
            debugger;
            let retState = state;
            for(var i=0;i<Object.keys(retState.usergoals).length;i++){
                var goal = retState.usergoals[i]
                debugger;
                if(goal.id == goalId) {
                    var task = goal.goaltasks;
                    debugger;
                    for(var j=0;j<Object.keys(task).length;j++){
                        if(task[j].id == taskId){
                            task[j].statusid = taskStatus;
                            task[j].status_id = taskStatus
                        }
                    }
                }
            }

            debugger;
            return {...state, retState};
        }


        case ActionTypes.UPDATE_GOAL_TASK_STATUS_SUCCESS : {
            const {updatedTaskStatus : {id,statusid,goalid}} = payload
            debugger;
            let retState = state;
            for(var i=0;i<Object.keys(retState.usergoals).length;i++){
                var goal = retState.usergoals[i]
                debugger;
                if(goal.id == goalid) {
                    var task = goal.goaltasks;
                    debugger;
                    for(var j=0;j<Object.keys(task).length;j++){
                        if(task[j].id == id){
                            task[j].statusid = statusid;
                            task[j].status_id = statusid
                        }
                    }
                }
            }

            debugger;
            return {...state, retState};
        }

        default: {
            return state
        }
    }

}

export default combineReducers({
    isLoading,isAddingOrDeleting, userGoals
})

