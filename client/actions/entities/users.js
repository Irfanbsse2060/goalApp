// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'

function callApiLogin(email, password, rememberMe) {
  debugger;
  return {
    [CALL_API]: {
      types: [
        USER_LOGIN,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAILURE
      ],
      endpoint: `/api/login`,
      method: 'POST'
    },
    payload: {email, password, rememberMe}
  }
}

export function login(email, password, rememberMe) {
  return (dispatch, getState) =>
    dispatch(callApiLogin(email, password, rememberMe))
}



export const USER_CONFIRM_REGISTRATION = 'USER_CONFIRM_REGISTRATION'
export const USER_CONFIRM_REGISTRATION_SUCCESS = 'USER_CONFIRM_REGISTRATION_SUCCESS'
export const USER_CONFIRM_REGISTRATION_FAILURE = 'USER_CONFIRM_REGISTRATION_FAILURE'

export function confirmRegistration(token) {
    return {
        [CALL_API]: {
            types: [
                USER_CONFIRM_REGISTRATION,
                USER_CONFIRM_REGISTRATION_SUCCESS,
                USER_CONFIRM_REGISTRATION_FAILURE
            ],
            endpoint: `/api/users/verify-account?token=${token}`,
            method: 'POST'
        },
        payload: {token}
    }
}

//by kamran
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS'
export const FETCH_ALL_USERS_SUCCESS = 'FETCH_ALL_USERS_SUCCESS'
export const FETCH_ALL_USERS_FAILURE = 'FETCH_ALL_USERS_FAILURE'

export function fetchAllUsers() {
    return {
        [CALL_API]: {
            types: [
                FETCH_ALL_USERS,
                FETCH_ALL_USERS_SUCCESS,
                FETCH_ALL_USERS_FAILURE
            ],
            endpoint: `api/fetch-all-users-goals`,
            method: 'GET'
        },
    }
}


export const FETCH_USER_GOALS = 'FETCH_USER_GOALS'
export const FETCH_USER_GOALS_SUCCESS = 'FETCH_USER_GOALS_SUCCESS'
export const FETCH_USER_GOALS_FAILURE = 'FETCH_USER_GOALS_FAILURE'

export function fetchUserGoals(email) {
    debugger;
    return {
        [CALL_API]: {
            types: [
                FETCH_USER_GOALS,
                FETCH_USER_GOALS_SUCCESS,
                FETCH_USER_GOALS_FAILURE
            ],
            endpoint: `api/fetch-user-goals?email=${email}`,
            method: 'GET'
        },
    }
}




export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE'

function callApiLogout() {
  return {
    [CALL_API]: {
      types: [
        USER_LOGOUT,
        USER_LOGOUT_SUCCESS,
        USER_LOGOUT_FAILURE
      ],
      endpoint: `/api/logout`,
      method: 'GET'
    }
  }
}

export function logout() {
  return (dispatch, getState) =>
    dispatch(callApiLogout())
      .then(() => dispatch(push('/login')))
}


export const USER_REGISTER = 'USER_REGISTER'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE'

export function register(firstName, lastName, email, password) {
    return {
        [CALL_API]: {
            types: [
                USER_REGISTER,
                USER_REGISTER_SUCCESS,
                USER_REGISTER_FAILURE
            ],
            endpoint: `/api/users/create`,
            method: 'POST'
        },
        payload: {firstName, lastName, email, password}
    }
}



export const USER_FORGOT_PASSWORD = 'USER_FORGOT_PASSWORD'
export const USER_FORGOT_PASSWORD_SUCCESS = 'USER_FORGOT_PASSWORD_SUCCESS'
export const USER_FORGOT_PASSWORD_FAILURE = 'USER_FORGOT_PASSWORD_FAILURE'

export function forgotPassword(email) {
    debugger;
    return {
        [CALL_API]: {
            types: [
                USER_FORGOT_PASSWORD,
                USER_FORGOT_PASSWORD_SUCCESS,
                USER_FORGOT_PASSWORD_FAILURE
            ],
            endpoint: `/api/users/forgot-password`,
            method: 'POST'
        },
        payload: {email}
    }
}


export const USER_RESET_PASSWORD = 'USER_RESET_PASSWORD'
export const USER_RESET_PASSWORD_SUCCESS = 'USER_RESET_PASSWORD_SUCCESS'
export const USER_RESET_PASSWORD_FAILURE = 'USER_RESET_PASSWORD_FAILURE'

export function resetPassword(token, password, confirmPassword) {
    return {
        [CALL_API]: {
            types: [
                USER_RESET_PASSWORD,
                USER_RESET_PASSWORD_SUCCESS,
                USER_RESET_PASSWORD_FAILURE
            ],
            endpoint: `/api/users/reset-password?token=${token}`,
            method: 'POST'
        },
        payload: {token, password, confirmPassword}
    }
}





export const USER_RESEND_ACTIVATION = 'USER_RESEND_ACTIVATION'
export const USER_RESEND_ACTIVATION_SUCCESS = 'USER_RESEND_ACTIVATION_SUCCESS'
export const USER_RESEND_ACTIVATION_FAILURE = 'USER_RESEND_ACTIVATION_FAILURE'

export function resendActivation(userId) {
    return {
        [CALL_API]: {
            types: [
                USER_RESEND_ACTIVATION,
                USER_RESEND_ACTIVATION_SUCCESS,
                USER_RESEND_ACTIVATION_FAILURE
            ],
            endpoint: `/api/users/resend-activation?id=${userId}`,
            method: 'POST'
        },
        payload: {userId}
    }
}

export const CHECK_TOKEN_RESET = 'CHECK_TOKEN_RESET'
export const CHECK_TOKEN_RESET_SUCCESS = 'CHECK_TOKEN_RESET_SUCCESS'
export const CHECK_TOKEN_RESET_FAILURE = 'CHECK_TOKEN_RESET_FAILURE'

export function isValidResetToken(tokenString) {
    debugger;
    return {
        [CALL_API]: {
            types: [
                CHECK_TOKEN_RESET,
                CHECK_TOKEN_RESET_SUCCESS,
                CHECK_TOKEN_RESET_FAILURE
            ],
            endpoint: `/api/users/search-user-token?search=${tokenString}`,
            method: 'POST'
        },
        payload: {tokenString}
    }
}