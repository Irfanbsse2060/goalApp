import React from 'react';
import { NavLink, Link, Route } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'

import styles from './PageUserProfileInner.scss'


const PageUserProfileInner = (props) =>{
    const {openChangeNameDialog, handleOpenChangeNameDialog,handleCloseChangeNameDialog,userFistName,userLastName,handleChangeFirstName,handleChangelastName,handleUpdateUserName} = props
    const {userData: {id, firstName, lastName, email}} = props
    var first = firstName.substring(0, 1)
    var second = lastName.substring(0, 1)
    var frstSecond = (first+second).toUpperCase()
    const ChangeNameActions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={handleCloseChangeNameDialog}
        />,
        <FlatButton
            label="Update"
            primary={true}
            onClick={handleUpdateUserName}
        />,
    ];

    const ChangePasswrodActions = [
        <FlatButton
            label="Cancel"
            primary={true}
        />,
        <FlatButton
            label="Update"
            primary={true}
        />,
    ];

    debugger;
    return(
        <div>
            <div className="row">
                <DocumentTitle title={`${firstName} ${lastName} - Goal App`}/>
                <div className="col-lg-2">
                    <List>
                        <ListItem primaryText="Change Name"  onTouchTap={handleOpenChangeNameDialog}/>
                        {/*<ListItem primaryText="Change Passowrd" />*/}
                        <Link to="/changePassword">Change Password</Link>
                    </List>
                    <Dialog
                        title="Change Name"
                        actions={ChangeNameActions}
                        modal={false}
                        open={openChangeNameDialog}
                    >
                        <TextField
                            id="firstName"
                            floatingLabelText="First Name"
                            floatingLabelFixed
                            value={userFistName}
                            onChange={(e,value) =>handleChangeFirstName(e,value)}
                            multiLine
                            fullWidth
                        />
                        <TextField
                            id="lastName"
                            floatingLabelText="Last Name"
                            floatingLabelFixed
                            value={userLastName}
                            onChange={(e,value) =>handleChangelastName(e,value)}
                            multiLine
                            fullWidth
                        />
                    </Dialog>
                    <Dialog
                        title="Change Password"
                        actions={ChangePasswrodActions}
                        modal={false}
                        open={false}
                    >
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value="sdfdf" />
                        </div>
                    </Dialog>
                </div>
                <div className="col-lg-8">
                 <div className="row">
                     <div className="col-lg-2" style={{backgroundColor : "#c13978",marginTop : 32,marginBottom : 20,fontSize : 80, paddingTop : 56,paddingLeft : 17,color : "#f5f5f5"}}>
                         {frstSecond}
                     </div>
                     <div className="col-lg-4">
                         <h1>{firstName} {lastName}</h1>
                         <p>{ email }</p>
                     </div>
                 </div>
                </div>
            </div>
        </div>
    )
}
export default PageUserProfileInner;
