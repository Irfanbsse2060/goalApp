//libs
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ReactStars from 'react-stars';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import UserProfile from 'material-ui/svg-icons/action/account-circle'
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import moment from 'moment'
import {
    deepOrange300,
    purple500,
} from 'material-ui/styles/colors';

import Slider from 'material-ui/Slider';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import PageLoading from '../PageLoading';
import './PageAdminDashboardInner.scss'

const PageAdminDashboardInner = (props) =>{
    const {allusers,statuses} = props;
    var cuurentTime =  moment(Date.now());
    var currentWeek = cuurentTime.week();
    var currentMonth = cuurentTime.format('MMMM')
    var currentYear = cuurentTime.format('YYYY');

    debugger;
    if(allusers == ""){
        return  <PageLoading/>
    }

    return (
        <div className="row">
            <div className="col-lg-2">

            </div>
            <div className="col-lg-8">
                <div className="row">
                    <div className="col-lg-6">
                        <Subheader>Wellcome Admin</Subheader>
                    </div>
                    <div className="col-lg-6 current-date">
                        <Subheader>Week {currentWeek} - {currentMonth}, {currentYear} </Subheader>
                    </div>
                </div>
                {allusers.map((user,index)=>{

                    return  <List>
                        <ListItem
                            primaryText={user.firstName+" "+user.lastName}
                            secondaryText={<ReactStars  count={5} size={20} color1={'#00bcd4'}
                                                                     />}
                            leftIcon={<UserProfile />}
                            initiallyOpen={false}
                            primaryTogglesNestedList={true}
                            nestedItems={
                          user.usergoals.map((goal,index)=>{
                              return(
                              goal.goaltasks.map((task,index1)=>{
                             var taskcomp = task.taskcompletionpercentage/100;

                              return  <Paper> <div className="row">
              <div className="col-lg-5">
                <ListItem style={{marginTop : 4}}
                disabled={true}
                  key={1}
                  primaryText={goal.goalname}
                   leftAvatar={
                               <Avatar style={{marginTop : 10}}

                                        size={20}
                                         >

                                        </Avatar>
                                     }
                />
                </div>
                <div className="col-lg-5">
                  <h6>{task.taskdetail}</h6>
                  </div>
                <div className="col-lg-2 task-status">
              {statuses.map((status,index)=>{
                                                     if(status.id == task.statusid) {
                                                         return <div>{status.type}</div>
                                                     }
                                                    })}
                </div>
                </div>
                 <Divider />
                </Paper>

                }) )
                          })
              }
                        />
                        <Divider />
                    </List>
                })}
            </div>
            <div className="col-lg-2">

            </div>
        </div>
    )
}

export default PageAdminDashboardInner;