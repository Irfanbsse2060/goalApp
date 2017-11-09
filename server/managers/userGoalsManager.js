//libs
import UserGoals from '../models/UserGoals'
import GoalTasks from '../models/goalTasks'

export const addGoal = (id,goal,dateTimeStamp) =>{
   return UserGoals.create({
        goalname : goal,
        userid: id,
        month : dateTimeStamp
    });
}


export const deleteGoal = (goalId) =>{
   /* UserGoals.destroy({
       where : {
           id : goalId,
       }
    });*/

    return UserGoals.findById(goalId)
        .then((object) => {
            if(null == object)
                return
            return object.destroy({ force: true })
        });
}


export const fetchUserGoal = (userId) =>
    UserGoals.findAll(Object.assign({
        where: {
            userid : userId
        },
        include: {
            model: GoalTasks,
        },
    }))
        .then(goalsOfUser => {
            console.log("In userGoalsManager (fetchUserGoal)")
            return goalsOfUser
        })





