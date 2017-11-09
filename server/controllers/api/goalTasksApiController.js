// libs
import express from 'express'
import crypto from 'crypto'

//src
const router = express.Router()
import {addTask,deleteTask,updateTask,updateTaskStatus,updateTaskDetail,getTaskStatus} from '../../managers/goalTasksManager'
import {fetchUserGoal} from '../../managers/userGoalsManager';




router.post('/api/goaltasks-add-task', (req, res) => {
    console.log("add goalTasks api is  called")
    const { body } = req

    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }



    const {taskDetail,weekNumber,estimatedHours,userGoalId,user} = body;
      console.log("task Detail is ")
       console.log(taskDetail);
      console.log("week number is ");
      console.log(weekNumber);
      console.log("userGoal id is ")
      console.log(userGoalId);
    addTask(taskDetail,weekNumber,estimatedHours,userGoalId)
        .then(() =>{
            fetchUserGoal(user)
                .then(goalsOfUser =>{
                    res
                        .status(200)
                        .send({
                            goalsOfUser
                        })
                })
        })
       /* .then(() =>{
        getUserAllTask(user).then((allTasksOfUser) =>{
            res
                .status(200)
                .send({allTasksOfUser})
        })
    })*/

})


router.post('/api/goaltasks-delete-task', (req, res) => {
    console.log("delete goalTasks api is  called")
    const { body } = req

    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }



    const {taskId,user} = body;
     console.log("task Id is ")
    console.log(taskId);
     deleteTask((taskId))
         .then(() =>{
             fetchUserGoal(user)
                 .then(goalsOfUser =>{
                     res
                         .status(200)
                         .send({
                             goalsOfUser
                         })
                 })
         })
   /* addTask(taskDetail,weekNumber,userGoalId)
        .then(() =>{
            fetchUserGoal(user)
                .then(goalsOfUser =>{
                    res
                        .status(200)
                        .send({
                            goalsOfUser
                        })
                })
        })*/

})


router.post('/api/goaltasks-update-taskStatus', (req, res) => {
    console.log("update goalTaskStatus  api is  called")
    const { body } = req

    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }
    const {taskId,taskStatus} = body;
    updateTaskStatus(taskId,taskStatus).then(()=>{
        console.log("after updateTaskStatus");
        getTaskStatus(taskId)
            .then(updatedStatus =>{
                console.log("after getTaskStatus")
                console.log("updated status in  goaltask controller")
                console.log(updatedStatus)
                console.log("updates status dataValues")
                console.log(updatedStatus.dataValues)
                var updatedTaskStatus = updatedStatus.dataValues;

                res
                    .status(200)
                    .send({updatedTaskStatus})
            })
    })

})



router.post('/api/goaltasks-edit-task-detail', (req, res) => {
    console.log("edit task detail  api is  called")
    const { body } = req

    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }
    const {taskId,taskDetail,user} = body;
    updateTaskDetail(taskId,taskDetail)
        .then(() =>{
            fetchUserGoal(user)
                .then(goalsOfUser =>{
                    res
                        .status(200)
                        .send({
                            goalsOfUser
                        })
                })
        })

})


router.post('/api/goaltasks-update-taskCompletionPercentage', (req, res) => {
    console.log("update goalTasks api is  called")
    const { body } = req

    if ( !body ) {
        rejectRequest('Missing request body', res)
        return
    }



    const {taskid,taskCompletionPerc} = body;
    console.log("taskid in goalTasks API controller is "+taskid);
    console.log("and task completion percentage in update goaltask api cont is "+taskCompletionPerc)
         updateTask(taskid,taskCompletionPerc)
})





export default router