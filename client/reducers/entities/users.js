import * as ActionTypes from '../../actions'
import { mergeNewEntities, ENTITY_STATUS_DATA_AVAILABLE } from '../../utils'

export default function users(state = {}, action) {
  switch (action.type) {

   /*   case ActionTypes.USER_LOGIN: {
          return {...state, isLoading: true}
      }
*/
  case ActionTypes.USER_LOGIN_SUCCESS: {
		if (!action.payload) {
      throw new Error(`Can't execute ${ ActionTypes.USER_LOGIN_SUCCESS }. {payload} isn't available in action`)
		}
		
     const { payload: { user } } = action
    return mergeNewEntities(state, [user], ENTITY_STATUS_DATA_AVAILABLE) 
  }

   /*   case ActionTypes.USER_LOGIN_FAILURE: {
          return {...state, isLoading: false}
      }*/

      case ActionTypes.USER_CHANGE_NAME_SUCCESS: {
          const { payload,firstName,lastName,userId} = action
          return {...state, [userId]: {...state[userId], firstName: firstName, lastName : lastName}};
          return state;
      }

      case ActionTypes.USER_LOGOUT: {
          return {...state, isLoading: false, isLogoutLoading: true}
      }
      case ActionTypes.USER_LOGOUT_SUCCESS: {
          return {...state, isLoading: false, isLogoutLoading: false}
      }
      case ActionTypes.USER_LOGOUT_FAILURE: {
          return {...state, isLoading: false, isLogoutLoading: false}
      }
  
  default: {
    return state
  }
  }
}
