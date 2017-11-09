// libs
import express from 'express'
import crypto from 'crypto'
import {addGoal,deleteGoal,fetchUserGoal} from '../../managers/userGoalsManager'
//src
const router = express.Router()


router.post('/api/usergoals-addgoal', (req, res) => {
    console.log("add user goal api called")
    const { body } = req

    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }



    const {userid,goalname,goalMonth} = body;
    console.log("userid in userGoalAPi controller is "+userid);
    console.log("and goalname is "+goalname)

    addGoal(userid,goalname,goalMonth).then(()=>{
        /*return true;*/
        fetchUserGoal(userid)
            .then(goalsOfUser =>{
                res
                    .status(200)
                    .send({
                        goalsOfUser
                    })
            })
    })
})


router.post('/api/usergoals-deletegoal', (req, res) => {
    console.log("delete user goal api called")
    const { body } = req

    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }

    const {goalId,userId} = body;
    deleteGoal(goalId)
        .then(()=>{
        console.log("return true printed")
     /*  return true;*/
            fetchUserGoal(userId)
                .then(goalsOfUser =>{
                    res
                        .status(200)
                        .send({
                            goalsOfUser
                        })
                })
    }
    )

})


export default router