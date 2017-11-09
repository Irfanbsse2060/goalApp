//libs
import Sequelize from 'sequelize';
import sequelize from './../utils/sequelize';
import GoalTasks from './goalTasks';



const Statuses = sequelize.define(
    "statuses",
    {
        id : {type : Sequelize.INTEGER ,  primaryKey: true, field : "id"},
        type : {type : Sequelize.STRING(20), field : "type"},

    },
    {
        timestamps : false,
        freezeTableName : true,
        underscored : true
    }
)

GoalTasks.belongsTo(Statuses,{
    foreignKey : 'status_id'
})
Statuses.hasMany(GoalTasks);
export default Statuses;