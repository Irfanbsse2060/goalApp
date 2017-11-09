// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'




export const ADD_GOAL_TASK = 'ADD_GOAL_TASK'
export const ADD_GOAL_TASK_SUCCESS = 'ADD_GOAL_TASK_SUCCESS'
export const ADD_GOAL_TASK_FAILURE = 'ADD_GOAL_TASK_FAILURE'

export function addGoalTask(taskDetail,weekNumber,estimatedHours,userGoalId,user) {
    debugger;
    return {
        [CALL_API]: {
            types: [
                ADD_GOAL_TASK,
                ADD_GOAL_TASK_SUCCESS,
                ADD_GOAL_TASK_FAILURE
            ],
            endpoint: `/api/goaltasks-add-task`,
            method: 'POST'
        },
        payload: {taskDetail,weekNumber,estimatedHours,userGoalId,user}
    }
}


export const EDIT_GOAL_TASK_DETAIL = 'EDIT_GOAL_TASK_DETAIL'
export const EDIT_GOAL_TASK_DETAIL_SUCCESS = 'EDIT_GOAL_TASK_DETAIL_SUCCESS'
export const EDIT_GOAL_TASK_DETAIL_FAILURE = 'EDIT_GOAL_TASK_DETAIL_FAILURE'

export function editGoalTaskDetail(taskId,taskDetail,user) {
    debugger;
    return {
        [CALL_API]: {
            types: [
                EDIT_GOAL_TASK_DETAIL,
                EDIT_GOAL_TASK_DETAIL_SUCCESS,
                EDIT_GOAL_TASK_DETAIL_FAILURE
            ],
            endpoint: `/api/goaltasks-edit-task-detail`,
            method: 'POST'
        },
        payload: {taskId,taskDetail,user}
    }
}




export const DELETE_GOAL_TASK = 'DELETE_GOAL_TASK'
export const DELETE_GOAL_TASK_SUCCESS = 'DELETE_GOAL_TASK_SUCCESS'
export const DELETE_GOAL_TASK_FAILURE = 'DELETE_GOAL_TASK_FAILURE'

export function deleteGoalTask(taskId,user) {
    debugger;
    return {
        [CALL_API]: {
            types: [
                DELETE_GOAL_TASK,
                DELETE_GOAL_TASK_SUCCESS,
                DELETE_GOAL_TASK_FAILURE
            ],
            endpoint: `/api/goaltasks-delete-task`,
            method: 'POST'
        },
        payload: {taskId,user}
    }
}




export const UPDATE_GOAL_TASK_STATUS = 'UPDATE_GOAL_TASK_STATUS'
export const UPDATE_GOAL_TASK_STATUS_SUCCESS = 'UPDATE_GOAL_TASK_STATUS_SUCCESS'
export const UPDATE_GOAL_TASK_STATUS_FAILURE = 'UPDATE_GOAL_TASK_STATUS_FAILURE'

export function updateGoalTaskStatus(taskId,taskStatus,goalId) {
    debugger;
    return {
        [CALL_API]: {
            types: [
                UPDATE_GOAL_TASK_STATUS,
                UPDATE_GOAL_TASK_STATUS_SUCCESS,
                UPDATE_GOAL_TASK_STATUS_FAILURE
            ],
            endpoint: `/api/goaltasks-update-taskStatus`,
            method: 'POST'
        },
        payload: {taskId,taskStatus,goalId}
    }
}



/*
export const UPDATE_GOAL_TASK = 'UPDATE_GOAL_TASK'
export const UPDATE_GOAL_TASK_SUCCESS = 'UPDATE_GOAL_TASK_SUCCESS'
export const UPDATE_GOAL_TASK_FAILURE = 'UPDATE_GOAL_TASK_FAILURE'

export function updateGoalTask(taskid,taskCompletionPerc) {
    debugger;
    return {
        [CALL_API]: {
            types: [
                UPDATE_GOAL_TASK,
                UPDATE_GOAL_TASK_SUCCESS,
                UPDATE_GOAL_TASK_FAILURE
            ],
            endpoint: `/api/goaltasks-update-taskCompletionPercentage`,
            method: 'POST'
        },
        payload: {taskid,taskCompletionPerc}
    }
}
*/



