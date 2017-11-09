import { combineReducers } from 'redux';
import allusers from './allusers';
import userGoals from './userGoals'
import statuses from './statuses'

export default combineReducers({
    allusers,userGoals,statuses
})