//libs
import Sequelize from 'sequelize';
import sequelize from './../utils/sequelize';
import Role from './Role';
import UserAccountType from './UserAccountType'
import TimeZone from './TimeZone'
import UserGoals from './UserGoals'

const User = sequelize.define(
    "users",
    {
        id : {type : Sequelize.INTEGER ,  primaryKey: true, field : "id"},
        firstName: { type: Sequelize.STRING(128), field: "first_name" },
        lastName: { type: Sequelize.STRING(128), field: "last_name" },
        email: { type: Sequelize.STRING(128), field: "email" },
        password: { type: Sequelize.STRING(128), field: "password" },
        resetPasswordToken: { type: Sequelize.STRING(128), defaultValue: null, field: "reset_pass_token" },
        resetPasswordExpires: { type: Sequelize.STRING(128), defaultValue: null, field: "reset_pass_expires" },
        registerToken: { type: Sequelize.STRING(128), defaultValue: null, field: "register_token" },
        registerExpires: { type: Sequelize.STRING(128), defaultValue: null, field: "register_expires" },
        status: { type: Sequelize.INTEGER, defaultValue: 1, field: "status" },
        roleId : {type : Sequelize.INTEGER , field : "role_id"}
    },
    {
        timestamps : true,
        freezeTableName : true,
        underscored : true
    }
)
User.belongsTo(Role)
User.belongsTo(UserAccountType)
User.belongsTo(TimeZone)
UserGoals.belongsTo(User,{
    foreignKey: 'user_id'
});
User.hasMany(UserGoals)
export default User;