//libs
import Sequelize from 'sequelize';
import sequelize from './../utils/sequelize';
import GoalTasks from './goalTasks';



const UserGoals = sequelize.define(
    "usergoals",
    {
        id : {type : Sequelize.INTEGER ,  primaryKey: true, field : "id"},
        goalname : {type : Sequelize.STRING(128), field : "goal_name"},
        userid : {type : Sequelize.INTEGER, field : "user_id"},
        month : {type: Sequelize.BIGINT, field : "month"},
    },
    {
        timestamps : false,
        freezeTableName : true,
        underscored : true
    }
)

GoalTasks.belongsTo(UserGoals,{
    foreignKey : 'usergoal_id'
})
UserGoals.hasMany(GoalTasks);
export default UserGoals;