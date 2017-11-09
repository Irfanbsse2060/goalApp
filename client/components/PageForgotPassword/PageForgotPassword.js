// libs
import React from 'react'
import {reduxForm} from 'redux-form'

// src
import PageForgotPasswordInner from './PageForgotPasswordInner'
import { forgotPassword } from '../../actions/entities/users'
import { bindForm } from '../../utils'
import {resetErrorMessages} from '../../actions'

const fields = ['email']

const validate = values => {
  let errors = {}
  let hasErrors = false
  if (!values.email || !values.email.trim() === '') {
    errors.email = 'Missing email field'
    hasErrors = true
  } else if (!/^[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
    hasErrors = true
  }
  return hasErrors && errors
}

@reduxForm({
  form: 'forgotPasswordForm',
  fields,
  validate,
  touchOnBlur: false
})
@bindForm({
  onSubmit: (values, dispatch, props) => {
    const { email } = values

    return dispatch(forgotPassword(email))
      .then(action => {
        return action
      })
  }
})
export default class PageForgotPassword extends React.Component {
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(resetErrorMessages())
  }

  constructor(props) {
    super(props)
  }
  render() {
    return <PageForgotPasswordInner {...this.props}/>
  }
}
