// libs
import express from 'express'
import crypto from 'crypto'

// src
import { encrypt, decrypt } from '../../utils/encryptionUtils'
import { ensureAnonymity, rejectRequest, caughtError } from '../../utils'
import { findUserByRegistrationToken, isActiveUser, findUserByToken, updateUser, findUserByID, findUserByEmail,findAllUsersGoals,findUserGoals,changeUserName} from '../../managers/userManager'
import { findRoleById } from '../../managers/roleManager'
import { findUserAccountTypeById } from '../../managers/userAccountTypeManager'
import { findTimeZoneById } from '../../managers/timeZoneManager'
import User from './../../models/User'
import emailUtils from './../../utils/emailUtils'

const router = express.Router()

// requires email and password
router.post('/api/login', ensureAnonymity, (req, res) => {
    console.log("api/login is called");
    const { body } = req
    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }

    const { email, password } = body
    if ( !email || !password ) {
        rejectRequest('Missing required arguments', res)
        return
    }

    findUserByEmail(email)
        .then(user => {
            console.log("Role id of "+user.firstName+" "+user.lastName+" is" +user.roleId);
            if (user) {
                const decryptedPassword = decrypt(user.password)
                if (password === decryptedPassword) {
                    isActiveUser(user.id)
                        .then(isActive => {
                            if (isActive) {
                                req.login(user, err => {
                                    if ( err ) caughtError(res, err)
                                    else res.send({ user })
                                })
                            } else {
                                res
                                    .status(404)
                                    .send({
                                        message: 'Your account is currently inactive. Please click <a href="/resend/activation/' + user.id + '">here</a> to resend the email containing activation link'
                                    })
                            }
                        })
                } else {
                    res
                        .status(404)
                        .send({
                            message: 'Invalid username or password'
                        })
                }
            } else {
                res
                    .status(404)
                    .send({
                        message: 'Invalid username or password'
                    })
            }
        })
})

router.get('/api/logout', (req, res) => {
    req.logout()
    res
        .status(200)
        .send({
            message: 'User logged out successfully!'
        })
})

router.get('/api/fetch-all-users-goals', (req,res) => {
    console.log("fetch-all-users api has been called");
     findAllUsersGoals().then(allusers =>{
         res
             .status(200)
             .send({
                 allusers
             })
     })
})


router.get('/api/fetch-user-goals', (req,res) => {
    console.log("fetch-user-goals  api has been called");
    const {query: {email}} = req
    console.log("Email is "+email)
    findUserGoals(email).then(usergoals =>{
       /* console.log(usergoals)*/
        res
            .status(200)
            .send({
                usergoals
            })
    })
})



router.post('/api/users/create', ensureAnonymity, (req, res) => {
    const { body } = req
    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }

    const { firstName, lastName, email, password } = body
    if ( !firstName || !lastName || !email || !password ) {
        rejectRequest('Missing required arguments', res)
        return
    }

    findUserByEmail(email)
        .then(user => {
            if (user) {
                res
                    .status(404)
                    .send({
                        message: 'Username already exist'
                    })
            } else {
                const encryptedPassword = encrypt(password)

                // now instantiate an object
                const userObj = User.build({firstName: firstName, lastName: lastName, email: email, password: encryptedPassword})

                findRoleById(2)
                    .then(role => {
                        userObj.setRole(role, {save: false})
                        findUserAccountTypeById(1)
                            .then(userAccountType => {
                                userObj.setUseraccounttype(userAccountType, {save: false})
                                findTimeZoneById(1)
                                    .then(timeZone => {
                                        userObj.setTimezone(timeZone, {save: false})
                                        userObj.status = 0

                                        crypto.randomBytes(20, (err, buf) => {
                                            const token = buf.toString('hex')
                                            userObj.registerToken = token
                                            userObj.registerExpires = Date.now() + 86400000 // 24 hours 1 hour = 3600000

                                            updateUser(userObj)
                                                .then(updatedUser => {
                                                    const activationUrl = req.protocol + '://' + req.get('host') + '/activateAccount/' + updatedUser.registerToken
                                                    const data = {firstName: updatedUser.firstName, activationUrl: activationUrl}

                                                    const allowedEmailList = ['majid.hussain@emumba.com', 'muhammad.kasim@emumba.com', 'zishan.iqbal@emumba.com', 'jawad.butt@emumba.com', 'arij.m.nazir@gmail.com']
                                                    let toEmailAddress = 'jawad.butt@emumba.com'
                                                    if (allowedEmailList.indexOf(email) > -1) {
                                                        toEmailAddress = email
                                                    }
                                                     console.log("i am just before sendAccountActivationEmail in userCreateApi(userApiController)")
                                                    console.log("Token is "+token)
                                                    emailUtils.sendAccountActivationEmail(toEmailAddress, data)
                                                        .then(() => {
                                                            res
                                                                .status(200)
                                                                .send({
                                                                    message: 'Sign up Successfully! Please follow a link in your email to activate your account'
                                                                })
                                                        })
                                                        .catch(error =>
                                                           /* caughtError(res, error)*/
                                                            res
                                                                .status(200)
                                                                .send({
                                                                    message: 'Sign up Successfully! Please follow a link in your email to activate your account'
                                                                })
                                                        )
                                                })
                                        })
                                    })
                            })
                    })
            }
        })
})

router.post('/api/users/forgot-password', ensureAnonymity, (req, res) => {
    const { body } = req
    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }

    const { email } = body
    if ( !email ) {
        rejectRequest('Missing required arguments', res)
        return
    }

    findUserByEmail(email)
        .then(user => {
            if (user) {
                crypto.randomBytes(20, (err, buf) => {
                    const token = buf.toString('hex')
                    user.resetPasswordToken = token
                    user.resetPasswordExpires = Date.now() + 86400000 // 24 hours 1 hour = 3600000
                    updateUser(user)
                        .then(userObj => {
                            const activationUrl = req.protocol + '://' + req.get('host') + '/resetPassword/' + userObj.resetPasswordToken
                            const data = {firstName: userObj.firstName, resetLink: activationUrl}

                            const allowedEmailList = ['majid.hussain@emumba.com', 'muhammad.kasim@emumba.com', 'zishan.iqbal@emumba.com', 'jawad.butt@emumba.com', 'arij.m.nazir@gmail.com']
                            let toEmailAddress = 'jawad.butt@emumba.com'
                            if (allowedEmailList.indexOf(userObj.email) > -1) {
                                toEmailAddress = userObj.email
                            }

                            emailUtils.sendResendPasswordEmail(toEmailAddress, data)
                                .then(() => {
                                    res
                                        .status(200)
                                        .send({
                                            message: 'Reset password email has been sent to the email address'
                                        })
                                })
                                .catch(error =>
                                   /* caughtError(res, error)*/
                                    res
                                        .status(200)
                                        .send({
                                            message: 'Reset password email has been sent to the email address'
                                        })
                                )
                        })
                })
            } else {
                res
                    .status(404)
                    .send({
                        message: 'Invalid username'
                    })
            }
        })
})

router.post('/api/users/search-user-token', (req, res) => {
    const { body } = req
    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }

    const { tokenString } = body
    if ( !tokenString ) {
        rejectRequest('Missing required arguments', res)
        return
    }

    findUserByToken(tokenString)
        .then(user => {
            if (user) {
                res
                    .status(200)
                    .send({
                        message: 'true'
                    })
            } else {
                res
                    .status(400)
                    .send({
                        message: 'false'
                    })
            }
        })
})

router.post('/api/users/reset-password', (req, res) => {
    const { body } = req
    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }

    const { token, password, confirmPassword } = body
    if ( !token || !password || !confirmPassword ) {
        rejectRequest('Missing required arguments', res)
        return
    } else if (password !== confirmPassword) {
        rejectRequest('Password and Confirm Password does not match', res)
        return
    }

    findUserByToken(token)
        .then(user => {
            if (user) {
                const encryptedPassword = encrypt(password)
                user.password = encryptedPassword
                user.resetPasswordToken = null
                user.resetPasswordExpires = null
                updateUser(user)
                    .then(() => {
                        res
                            .status(200)
                            .send({
                                message: 'Password has been changed, please <a href="/login">login</a>'
                            })
                    })
            } else {
                res
                    .status(400)
                    .send({
                        message: 'User does not exist'
                    })
            }
        })
})


router.post('/api/users/change-username', (req, res) => {
    const { body } = req
    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }
    const {firstName,lastName,userId} = body;
    console.log("change username api has been called")
    console.log(firstName)
    console.log(lastName)
    console.log(userId);
    changeUserName(firstName,lastName,userId).then((result)=>{
        console.log(result);
        if(result[0] == 1)
            res
                .status(200)
                .send({result:true})
        else res
            .status(400)
            .send({
                message : 'error occured'
            })
    });



})


router.post('/api/users/verify-account', (req, res) => {
    const { body } = req
    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }

    const { token } = body
    if ( !token ) {
        rejectRequest('Missing required arguments', res)
        return
    }

    findUserByRegistrationToken(token)
        .then(user => {
            if (user) {
                user.status = 1
                user.registerToken = null
                user.registerExpires = null
                updateUser(user)
                    .then(() => {
                        res
                            .status(200)
                            .send({
                                message: 'Your account has been activated, please login'
                            })
                    })
            } else {
                res
                    .status(400)
                    .send({
                        message: 'User does not exist'
                    })
            }
        })
})

router.post('/api/users/resend-activation', (req, res) => {
    const { body } = req
    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }

    const { userId } = body
    if ( !userId ) {
        rejectRequest('Missing required arguments', res)
        return
    }

    findUserByID(userId)
        .then(user => {
            if (user) {
                crypto.randomBytes(20, (err, buf) => {
                    const token = buf.toString('hex')
                    user.registerToken = token
                    user.registerExpires = Date.now() + 86400000 // 24 hours 1 hour = 3600000
                    user.status = 0
                    updateUser(user)
                        .then(userObj => {
                            const activationUrl = req.protocol + '://' + req.get('host') + '/activateAccount/' + userObj.registerToken
                            const data = {firstName: userObj.firstName, activationUrl: activationUrl}

                            const allowedEmailList = ['majid.hussain@emumba.com', 'muhammad.kasim@emumba.com', 'zishan.iqbal@emumba.com', 'jawad.butt@emumba.com', 'arij.m.nazir@gmail.com']
                            let toEmailAddress = 'jawad.butt@emumba.com'
                            if (allowedEmailList.indexOf(userObj.email) > -1) {
                                toEmailAddress = userObj.email
                            }

                            emailUtils.resendAccountActivationEmail(toEmailAddress, data)
                                .then(() => {
                                    res
                                        .status(200)
                                        .send({
                                            message: 'Activation email sent Successfully! Please follow a link in your email to activate your account'
                                        })
                                })
                                .catch(error =>
                                    caughtError(res, error)
                                )
                        })
                        .catch(error =>
                            caughtError(res, error)
                        )
                })
            } else {
                res
                    .status(400)
                    .send({
                        message: 'User does not exist'
                    })
            }
        })
})

export default router
