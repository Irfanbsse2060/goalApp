// libs
import Role from '../models/Role'

export const findRoleById = (id) =>
    Role.findOne(Object.assign({
        where: {
            id
        }
    }))
        .then(obj => {
            return obj
        })
