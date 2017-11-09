//libs
import Sequelize from 'sequelize';
import sequelize from './../utils/sequelize';

const Role = sequelize.define(
    "roles",
    {
        roleName : {type : Sequelize.STRING(128), field : "role_name"}
    },
    {
    timestamps : false,
    freezeTableName : true,
    underscored : true
    }
)
export default Role