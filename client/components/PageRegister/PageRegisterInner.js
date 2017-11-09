// libs
import React from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import DocumentTitle from 'react-document-title';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';

// src
import './PageRegisterInner.scss';
import { renderTextField } from '../../utils'

const PageRegisterInner = props => {
  const { onSubmit, renderSubmitButton, renderMessage, onHandleNoSpaces } = props;

  return (
    <div className="page-login">
      <div className="main-body main-body-primary">
        <DocumentTitle title="Register - Wisdom"/>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            
            <div className="body-inner">
              <div className="card bg-white">
                <div className="card-content">
                  <section className="logo text-center">
                    <h1><a href="#/">Sign Up</a></h1>
                    {
                      renderMessage()
                    }
                  </section>

                  <form className="form-horizontal">
                    <fieldset>
                      <div className="form-group">
                        <Field name="firstName" label="First Name" autoComplete="off" component={renderTextField} onChange={onHandleNoSpaces.bind(this)} />
                      </div>
                      <div className="form-group">
                        <Field name="lastName" label="Last Name" autoComplete="off" component={renderTextField} onChange={onHandleNoSpaces.bind(this)} />
                      </div>
                      <div className="form-group">
                        <Field name="email" label="Email" autoComplete="off" component={renderTextField} onChange={onHandleNoSpaces.bind(this)} />
                      </div>
                      <div className="form-group">
                        <Field name="password" label="Password" type="password" autoComplete="off" component={renderTextField} />
                      </div>
                      <div className="form-group">
                        <Field name="confirmPassword" label="Confirm Password" type="password" autoComplete="off" component={renderTextField} />
                      </div>
                      <div className="divider" />
                      <div className="form-group">
                        <p className="text-small">By clicking on sign up, you agree to <Link to="/terms"><i>terms</i></Link> and <Link to="/privacy"><i>privacy policy</i></Link></p>
                      </div>
                    </fieldset>
										<div className="card-action no-border text-right">
											<Link to="/login" className="color-gray-light">Login</Link>
											{
												renderSubmitButton({
													label: 'Sign Up',
													labelWhenSubmitting: 'Sign Up'
												})
											}
										</div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </QueueAnim>
      </div>
    </div>
/*
    <div className={`${styles.root} row`}>
      <div className="col-lg-6 col-lg-offset-3">
        <DocumentTitle title="Login - Sauron"/>
        <Paper>
          <form className={styles.root} onSubmit={onSubmit}>
            <h2 className="dialog-heading" style={{textAlign: 'center'}}>Sign in</h2>
            {
              renderMessage()
            }
            <Field name="email" label="Email" component={renderTextField} autoFocus/>
            <Field name="password" label="Password" component={renderTextField} type="password"/>
            <div className={styles.btnSubmitContainer}>
              {
                  renderSubmitButton({
                      label: 'Login',
                      labelWhenSubmitting: 'Logging in ...'
                  })
              }
            </div>
            <div className={styles.instructionsContainer}>
            </div>
            <input type="submit" style={{display: 'none'}}/>
          </form>
        </Paper>
      </div>
    </div>
    */
  );
}

export default PageRegisterInner
