// libs
import UserAccountType from '../models/UserAccountType'

export const findUserAccountTypeById = (id) =>
  UserAccountType.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })
