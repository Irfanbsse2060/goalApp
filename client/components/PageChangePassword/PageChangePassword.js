// libs
import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import PageChangePasswordInner from './PageChangePasswordInner'
import PageLoading from '../PageLoading'
import {changePassword} from '../../actions/entities/users'
import {resetErrorMessages} from '../../actions'
import { encrypt, decrypt } from '../../../server/utils/encryptionUtils'
import { bindForm } from '../../utils'

const fields = ['oldPassword', 'newPassword','confirmNewPassword']

const validate = values => {

  let errors = {}
  let hasErrors = false
  if (!values.oldPassword || !values.oldPassword.trim() === '') {
    errors.oldPassword = 'Missing old password field'
    hasErrors = true
  }



    if (!values.newPassword || !values.newPassword.trim() === '') {
        if (values.newPassword) {
            errors.newPassword = 'Enternew password'
            hasErrors = true
        } else {
            errors.newPassword = 'Missing New password field'
            hasErrors = true
        }
    }
    else if (values.newPassword.length < 6) {
        errors.newPassword = "Password should have at least 6 characters"
        hasErrors = true
    }

	
  if (!values.confirmNewPassword || !values.confirmNewPassword.trim() === '') {
    if (values.confirmNewPassword) {
      errors.confirmNewPassword = 'Re-type New password'
      hasErrors = true
    } else {
      errors.confirmNewPassword = 'Missing confirm new password field'
      hasErrors = true
    }
  }
	
	if (values.newPassword && values.confirmNewPassword) {
    if (values.newPassword != values.confirmNewPassword) {
      errors.confirmNewPassword = 'These passwords don\'t match. Try again?'
      hasErrors = true
    }
  }
  return hasErrors && errors
}

const mapStateToProps = (state,ownProps) =>{
    const {entities : {users}} = state
    const {auth : {user}} = state
    const userData = users[user]
    debugger;
    return {users,user,userData};
}


@connect(mapStateToProps,{changePassword})

@reduxForm({
  form: 'changePasswordForm',
  fields,
  validate,
  touchOnBlur: false
})
@bindForm({
  onSubmit: (values, dispatch, props) => {
    const {oldPassword, newPassword,confirmNewPassword } = values

    return dispatch(changePassword(oldPassword, newPassword,confirmNewPassword))
    .then(action => {
      return action
    })
  }
})
export default class PageChangePassword extends React.Component {
  state = {
    check: 1
  }

  componentDidMount() {
    const { dispatch ,userData} = this.props
      console.log("user data ")
      console.log(userData)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(resetErrorMessages())
  }

  constructor(props) {
    super(props)
  }
  render() {
      return <PageChangePasswordInner {...this.props}/>
  }
}
