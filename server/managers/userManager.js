// libs
import User from '../models/User'
import Role from '../models/Role'
import UserAccountType from '../models/UserAccountType'
import TimeZone from '../models/TimeZone'
import UserGoals from '../models/UserGoals'
import GoalTasks from '../models/goalTasks'
import Statuses from '../models/Statuses'

export const findUserByID = (id) =>
    User.findOne(Object.assign({
        where: {
            id
        },
        include: [Role, UserAccountType, TimeZone]
    }))
        .then(obj => {
            return obj
        })


//by kamran
export const findAllUsersGoals = () =>
    User.findAll(Object.assign({
        where: {
            role_id : 2
        },
       include : [{
            model : UserGoals ,
            include : [{
                model : GoalTasks,
                include : [{
                    model : Statuses
               }]
          }]
       }],
        attributes: ['firstName', 'lastName','email'],
        logging: true
    }))
        .then(users => {
            return users
        })


export const findUserGoals = (id) =>
    User.findOne(Object.assign({
        where: {
            id
        },
        include : [{
            model : UserGoals ,
            include : [{
                model : GoalTasks,
                include : [{
                    model : Statuses
                }]
            }]
        }],
        attributes: ['firstName', 'lastName','email'],
    }))
        .then(user => {
            return user
        })





export const findUserByEmailAndPassword = (email, password) =>
    User.findOne(Object.assign({
        where: {
            email,
            password
        },
        include: [Role, UserAccountType, TimeZone]
    }))
        .then(obj => {
            return obj
        })

export const isActiveUser = (id) =>
    User.findOne(Object.assign({
        where: {
            id,
            status: 1
        }
    }))
        .then(obj => {
            if (obj)
                return true
            else
                return false
        })

export const findUserByEmail = (email) =>
    User.findOne(Object.assign({
        where: {
            email
        }
    }))
        .then(obj => {
            return obj
        })

export const insertUser = (userObj) =>
    userObj.save()
        .then(obj => {
            return obj
        })


export const changeUserName = (firstName,lastName,userId) => {
    return User.update({
            firstName : firstName,
            lastName : lastName
        },
        {
            where : {id : userId}
        })
}


export const updateUser = (userObj) =>
    userObj.save()
        .then(obj => {
            return obj
        })

export const findUserByToken = (resetPasswordToken) =>
    User.findOne(Object.assign({
        where: {
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        }
    }))
        .then(obj => {
            return obj
        })

export const findUserByRegistrationToken = (registerToken) =>
    User.findOne(Object.assign({
        where: {
            registerToken,
            registerExpires: { $gt: Date.now() }
        }
    }))
        .then(obj => {
            return obj
        })
