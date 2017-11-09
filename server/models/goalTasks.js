//libs
import Sequelize from 'sequelize';
import sequelize from './../utils/sequelize';


const GoalTasks = sequelize.define(
    "goaltasks",
    {
        id : {type : Sequelize.INTEGER ,  primaryKey: true, field : "id"},
        taskdetail : {type : Sequelize.STRING(128), field : "task_detail"},
        statusid : {type : Sequelize.INTEGER, field : "status_id"},
        weeknumber : {type: Sequelize.BIGINT, field : "week_number"},
        goalid : {type : Sequelize.INTEGER, field : "usergoal_id"},
        estimatedhours : {type : Sequelize.FLOAT, field : "estimated_hours"},
        hoursspent : {type : Sequelize.FLOAT, field : "hours_spent"},
    },
    {
        timestamps : false,
        freezeTableName : true,
        underscored : true
    }
)
export default GoalTasks;