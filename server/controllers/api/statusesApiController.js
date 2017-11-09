// libs
import express from 'express'
import crypto from 'crypto'

//src
const router = express.Router()
import {getstatuses} from '../../managers/statusesManager'



router.post('/api/statuses-getallstatuses', (req, res) => {
                 console.log("in statuses api controller")
        getstatuses()
            .then(allstatuses =>{
                console.log("all statuses in statuses api controller")
                console.log(allstatuses)
                res
                    .status(200)
                    .send({allstatuses})
            })


})



export default router