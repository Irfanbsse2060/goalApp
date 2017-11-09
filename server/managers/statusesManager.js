//libs
import Statuses from '../models/Statuses'

export const getstatuses = () =>{
   return Statuses.findAll({
        attributes: ['id', 'type']
    })
        .then(allStatuses => {
            console.log("all statuses in status manager")
            console.log(allStatuses);
            return allStatuses
        })
}
