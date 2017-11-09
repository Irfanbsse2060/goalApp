// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const GET_ALL_STATUSES = 'GET_ALL_STATUSES'
export const GET_ALL_STATUSES_SUCCESS = 'GET_ALL_STATUSES_SUCCESS'
export const GET_ALL_STATUSES_FAILURE = 'GET_ALL_STATUSES_FAILURE'

export function getAllStatuses() {
    console.log("action getAllStatuses called")
    var a=1;
    debugger;
    return {
        [CALL_API]: {
            types: [
                GET_ALL_STATUSES,
                GET_ALL_STATUSES_SUCCESS,
                GET_ALL_STATUSES_FAILURE
            ],
            endpoint: `/api/statuses-getallstatuses`,
            method: 'POST'
        },
        payload: {a}
    }
}



