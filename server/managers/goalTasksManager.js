//libs
import GoalTasks from '../models/goalTasks'
import UserGoals from '../models/UserGoals'


export const addTask = (taskDetail,weekNumber,estimatedHours,userGoalId) =>{
    return GoalTasks.create({
        taskdetail : taskDetail,
        statusid : 1,
        weeknumber : weekNumber,
        estimatedhours: estimatedHours,
        goalid : userGoalId
        });
}


export const deleteTask = (taskId) =>{
    return GoalTasks.findById(taskId)
        .then((object) => {
            if(null == object)
                return
            return object.destroy({ force: true })
        });
}



export const updateTask = (taskId,taskCompPerc) =>{
    GoalTasks.update({
            taskcompletionpercentage : taskCompPerc,
    },
        {
            where : {id : taskId}
        });
}

export const updateTaskStatus = (taskId,taskStatus) => {
   return GoalTasks.update({
        statusid : taskStatus
    },
        {
        where : {id : taskId}
    }).then(()=>{
       return true;
   })
}


export const updateTaskDetail = (taskId,taskDetail) => {
    return GoalTasks.update({
            taskdetail : taskDetail
        },
        {
            where : {id : taskId}
        }).then(()=>{
        return true;
    })
}


export const getTaskStatus = (taskId) =>{
   return GoalTasks.findOne({
        where : {id : taskId},
        attributes: ['id','statusid','goalid'],
    }).then(updatedStatus =>{
        return updatedStatus;
    })
}