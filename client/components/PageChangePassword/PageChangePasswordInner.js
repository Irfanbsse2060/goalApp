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
import './PageChangePasswordInner.scss';
import { renderTextField } from '../../utils'
import { renderCheckbox } from '../../utils'

const PageChangePasswordInner = props => {
  const { onSubmit, renderSubmitButton, renderMessage } = props;

  return (
    <div className="page-login">
      <div className="main-body">
        <DocumentTitle title="Change Password - Wisdom"/>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <div className="body-inner">
              <div className="card bg-white">
                <div className="card-content">
                  <section className="logo text-center">
                    <h1><a href="#/">Change Password</a></h1>
                    {
                      renderMessage()
                    }
                  </section>
                  <form className="form-horizontal" onSubmit={onSubmit}>
                    <fieldset>
                      <div className="form-group">
                        <Field name="oldPassword" label="Old Password" component={renderTextField} type="password"/>
                      </div>
                      <div className="form-group">
                        <Field name="newPassword" label="New Password" component={renderTextField} type="password"/>
                      </div>
                      <div className="form-group">
                        <Field name="confirmNewPassword" label="Confirm New Password" component={renderTextField} type="password"/>
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div className="card-action no-border text-right">
                  {
                    renderSubmitButton({
                      label: 'Reset',
                      labelWhenSubmitting: 'Reset'
                    })
                  }
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
  )
}

export default PageChangePasswordInner
