// libs
import React from 'react'
import {reduxForm, change as changeFieldValue} from 'redux-form'
import {push} from 'react-router-redux'
import PageRegisterInner from './PageRegisterInner'
import {register} from '../../actions/entities/users'
import { bindForm } from '../../utils'

const fields = ['firstName', 'lastName', 'email', 'password']

const validate = values => {
  let errors = {};
  let hasErrors = false;
  if( !values.firstName || !values.firstName.trim() === '' ) {
    errors.firstName = 'Missing first name field';
    hasErrors = true;
  } else {
    if (!/^[A-Za-z]/.test(values.firstName)) {
      errors.firstName = 'Invalid input. Type with an open eye?';
      hasErrors = true;
    }
    if (values.firstName.length > 32) {
      errors.firstName = 'You can\'t possibly have that huge a first name. Try again?';
      hasErrors = true;
    }
  }
  if( !values.lastName || !values.lastName.trim() === '' ) {
    errors.lastName = 'Missing last name field';
    hasErrors = true;
  } else {
    if (!/^[A-Za-z]/.test(values.lastName)) {
      errors.lastName = 'Invalid input. Type with an open eye?';
      hasErrors = true;
    }
    if (values.lastName.length > 32) {
      errors.lastName = 'You can\'t possibly have that huge a first name. Try again?';
      hasErrors = true;
    }
  }
  if (!values.email || !values.email.trim() === '') {
    errors.email = 'Missing email field';
    hasErrors = true;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    hasErrors = true;
  }
  if( !values.password || !values.password.trim() === '' ) {
    errors.password = 'Missing password field';
    hasErrors = true;
  } else if(values.password.length < 6) {
    errors.password = "Password should have at least 6 characters"
    hasErrors = true;
  }
  if (!values.confirmPassword || !values.confirmPassword.trim() === '') {
    if (values.password) {
      errors.confirmPassword = 'Re-type password';
      hasErrors = true;
    } else {
      errors.confirmPassword = 'Missing confirm password field';
      hasErrors = true;
    }
  }
  if(values.password && values.confirmPassword) {
    if(values.password != values.confirmPassword) {
      errors.confirmPassword = 'These passwords don\'t match. Try again?';
      hasErrors = true;
    }
  }
  return hasErrors && errors;
}

@reduxForm({
  form: 'registerForm',
  fields,
  validate,
  touchOnBlur: false
})
@bindForm({
  onSubmit: (values, dispatch, props) => {
    const { firstName, lastName, email, password } = values;

    return dispatch(register(firstName, lastName, email, password))
    .then(action => {
      return action
    })
  }
})
export default class PageRegister extends React.Component {
  constructor(props) {
    super(props)
  }

  handleNoSpaces = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    if (fieldValue == ' ') {
      this.props.dispatch(changeFieldValue('registerForm', fieldName, ''));
      e.preventDefault();
    }
  }

  render() {
    return <PageRegisterInner {...this.props} onHandleNoSpaces={ this.handleNoSpaces }/>
  }
}
