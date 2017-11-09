// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'




export const ADD_USER_GOAL = 'ADD_USER_GOAL'
export const ADD_USER_GOAL_SUCCESS = 'ADD_USER_GOAL_SUCCESS'
export const ADD_USER_GOAL_FAILURE = 'ADD_USER_GOAL_FAILURE'

export function addUserGoal(userid,goalname,goalMonth) {
    debugger;
    return {
        [CALL_API]: {
            types: [
               ADD_USER_GOAL,
                ADD_USER_GOAL_SUCCESS,
                ADD_USER_GOAL_FAILURE
            ],
            endpoint: `/api/usergoals-addgoal`,
            method: 'POST'
        },
        payload: {userid,goalname,goalMonth}
    }
}



export const DELETE_USER_GOAL = 'DELETE_USER_GOAL'
export const DELETE_USER_GOAL_SUCCESS = 'DELETE_USER_GOAL_SUCCESS'
export const DELETE_USER_GOAL_FAILURE = 'DELETE_USER_GOAL_FAILURE'

export function deleteUserGoal(goalId,userId) {
    debugger;
    return {
        [CALL_API]: {
            types: [
                DELETE_USER_GOAL,
                DELETE_USER_GOAL_SUCCESS,
                DELETE_USER_GOAL_FAILURE
            ],
            endpoint: `/api/usergoals-deletegoal`,
            method: 'POST'
        },
        payload: {goalId,userId}
    }
}


