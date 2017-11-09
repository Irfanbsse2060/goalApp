import aws from 'aws-sdk'
import {_} from 'underscore'
import fs from 'fs'
import q from 'q'
import path from 'path'
import awsConfig from '../../config/aws-s3.config'

aws.config.update(awsConfig)
const ses = new aws.SES({apiVersion: '2010-12-01'})
const FROM_EMAIL = 'majid.hussain@emumba.com'

const sendResendPasswordEmail = (to, data) => {
  return sendEmail('reset-password.html', to, 'Goals App - Reset Password', data)
}

const sendAccountActivationEmail = (to, data) => {    
  return sendEmail("confirm-your-account.html", to, 'Verify your email account', data)
}

const resendAccountActivationEmail = (to, data) => {    
  return sendEmail("confirm-your-account.html", to, 'Verify your email account', data)
}

const sendEmail = (templateName, to, subject, data) => {

  // console.log('sending email to: ' + to + ' AND data is : ' + data)
  let promise = q.defer()
  
  // read template file from disk
  
  fs.readFile(path.resolve(`./server/templates/email/${templateName}`), 'utf-8', (err, content) => {
    
    if(err){
      console.log('Error while reading temaplte: ' + err)
      return promise.reject(err)
    }
    // feed the content to _.template
    let template = _.template(content)
    let result = template(data)
    // console.log('result : ' + result)
    let receivers = typeof (to) === 'string' ? [to] : to
    
    // if(appUtils.isTest())
    //  return promise.resolve()
      
    ses.sendEmail({
       Source: FROM_EMAIL,
       Destination: { ToAddresses: receivers },
       Message: {
           Subject: {
              Data: subject
           },
           Body: {
               Html: {
                   Data: result
               }
            }
       }
    }, 
    (err, data) => {
        if(err)
          return promise.reject(err)
            
        return promise.resolve()        
    })    
  })
  
  return promise.promise
}

const sendSimpleEmail = (to, subject, data) => {
// console.log('awsConfig accessKeyId : ' + awsConfig.accessKeyId)

  // console.log('sending email to: ' + to + ' AND data is : ' + data)
  let promise = q.defer()
  
  let receivers = typeof (to) === 'string' ? [to] : to

  ses.sendEmail({
       Source: FROM_EMAIL,
       Destination: { ToAddresses: receivers },
       Message: {
           Subject: {
              Data: subject
           },
           Body: {
               Text: {
                   Data: data
               }
            }
       }
  }, 
  (err, data) => {
        if(err)
          return promise.reject(err)
            
        return promise.resolve()        
  })    
  
  return promise.promise
}

export default{
  sendResendPasswordEmail,
  sendAccountActivationEmail,
  resendAccountActivationEmail
}
