//libs
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'


//src
import PageDashboardInner from './PageDashboardInner'
import {fetchUserGoals} from '../../actions/entities/users'
import {addUserGoal,deleteUserGoal} from '../../actions/entities/usergoals'
import {editGoalTaskDetail,updateGoalTaskStatus,addGoalTask,deleteGoalTask} from '../../actions/entities/goalTasks'
import {getAllStatuses} from '../../actions/entities/statuses'

const mapStateToProps = (state, ownProps) => {
    debugger;
    const {auth : {user}} = state
    const {feed : {userGoals:{userGoals, isLoading,isAddingOrDeleting}}} = state
    const {feed : {statuses : {statuses}}} = state
    console.log(userGoals)
    console.log(isLoading)
    debugger;
    return {userGoals,user,isLoading,isAddingOrDeleting,statuses}
}

@connect(mapStateToProps,{fetchUserGoals,addUserGoal,editGoalTaskDetail,updateGoalTaskStatus,addGoalTask,deleteGoalTask,deleteUserGoal,getAllStatuses})

export default class PageAdminDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            open :false,
            dropDownValue :"",
            userGoalsMonths : [],
            openDeleteDialog : false,
            deleteGoalId : -1,
            deleteTaskId : -1,
            weeks : [],
            editTaskId : -1,
            editTaskDetail : "",
            openEditDialog : false,
            openAddTaskDialog : false,
            currentMonthYear : "",

        }

        this.handleCancelDialog = this.handleCancelDialog.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleDropDownValue = this.handleDropDownValue.bind(this);
        this.handleGoalDelete = this.handleGoalDelete.bind(this);
        this.handleTaskStatusDropdown = this.handleTaskStatusDropdown.bind(this);
        this.handleCloseDeleteDialog = this.handleCloseDeleteDialog.bind(this);
        this.handleOpenDeleteDialog = this.handleOpenDeleteDialog.bind(this);
        this.handleConfirmDeleteDialog = this.handleConfirmDeleteDialog.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.handleOpenEditDialog = this.handleOpenEditDialog.bind(this);
        this.handleCloseEditDialog = this.handleCloseEditDialog.bind(this);
        this.handleEditingTaskDetail = this.handleEditingTaskDetail.bind(this);
        this.handleUpdateEditedTask = this.handleUpdateEditedTask.bind(this);
        this.handleOpenAddDialog = this.handleOpenAddDialog.bind(this);
        this.handleCloseAddDialog = this.handleCloseAddDialog.bind(this);

    }

    componentDidMount(){
        const {fetchUserGoals,user,getAllStatuses} = this.props;
        fetchUserGoals(user);
        getAllStatuses();
    }

    componentWillMount(){
        var userGoalsMonth = moment(Date.now().valueOf());
        var goalsMonth = userGoalsMonth.format('MMM')
        var goalsYear = userGoalsMonth.format('YYYY');
        var monthYear = goalsMonth+","+goalsYear;
        this.setState({dropDownValue: monthYear})



        var currentMonth = moment(Date.now()).format('MMM')
        var currentYear = moment(Date.now()).format('YYYY');
        var currentMonthYear =  currentMonth + "," + currentYear;
        this.setState({currentMonthYear : currentMonthYear})


        var currentYear = moment(Date.now()).year();
        var currrentMonth = moment(Date.now()).month();
        var startWeekCurrentDate = moment(Date.now()).startOf('month').weeks();
        var endWeekCurrentDate = moment(Date.now()).endOf('month').weeks();
        var weeksOfCurrentMonth = [];
        var week = {"startDate": -1,"endDate" : -1}

      for(var weekCount=startWeekCurrentDate;weekCount<=endWeekCurrentDate;weekCount++){
          week.startDate = moment().day(0).year(currentYear).week(weekCount).valueOf();
          week.endDate = moment().day(6).year(currentYear).week(weekCount).valueOf();
          weeksOfCurrentMonth.push(Object.assign({},week));
      }

        // for(var weekCount=startWeekCurrentDate,i=0;weekCount<=endWeekCurrentDate;weekCount++,i++){
        //     if(i==0) {
        //         week.startDate = moment().day('monday').year(currentYear).month(currrentMonth).valueOf();
        //         week.endDate = moment().day('friday').year(currentYear).month(currrentMonth).valueOf();
        //     }
        //     else {
        //         week.startDate = moment(week.startDate).add(1, 'week').valueOf();
        //         week.endDate = moment(week.endDate).add(1, 'week').valueOf();
        //     }
        //
        //     weeksOfCurrentMonth.push(Object.assign({},week));
        // }

        this.setState({weeks : weeksOfCurrentMonth})
    }


    handleOpenDialog(){
        this.setState({open:true})
    }


    handleCancelDialog(){
        this.setState({open:false})
    }



    handleDropDownValue(event,index,value){
        this.setState({dropDownValue:value})
        debugger;
    }



    handleGoalDelete(goalId){
        const {deleteUserGoal,user,fetchUserGoals} = this.props;
        this.setState({openDeleteDialog : true})
        this.setState({deleteGoalId : goalId})
        debugger;
        debugger;
    }

    handleDeleteTask(taskid){
        const {deleteGoalTask,user} = this.props
        this.setState({openDeleteDialog : true})
        this.setState({deleteTaskId : taskid})
        debugger;
    }


    handleTaskStatusDropdown(event,index,value,taskId,goalId){
        debugger;
        const {updateGoalTaskStatus,statuses} = this.props;
        if(statuses[value-1].type == 'In Progress')
            console.log('In progress')
        else
            console.log("Completed or Pending")
       debugger;
       var a= updateGoalTaskStatus(taskId,value,goalId);
       console.log(a);
        debugger;
    }


    handleCloseDeleteDialog(){
        this.setState({openDeleteDialog : false})
    }

    handleConfirmDeleteDialog(){
        const {deleteUserGoal,deleteGoalTask,user} = this.props;
        if(this.state.deleteGoalId != -1) {
            deleteUserGoal(this.state.deleteGoalId, user)
            this.setState({openDeleteDialog: false})
            this.setState({deleteGoalId: -1, deleteTaskId: -1})
        }

        if(this.state.deleteTaskId != -1) {
            deleteGoalTask(this.state.deleteTaskId, user)
            this.setState({openDeleteDialog: false})
            this.setState({deleteGoalId: -1, deleteTaskId: -1})
        }

    }

    handleOpenDeleteDialog(){
        this.setState({openDeleteDialog : true})
    }


    handleEditTask(taskId,taskDetail){
            this.setState({editTaskId : taskId, editTaskDetail : taskDetail,openEditDialog : true
            })
        debugger;
    }

    handleEditingTaskDetail(event,newValue){
        this.setState({ editTaskDetail : newValue})
        debugger;
    }

    handleOpenEditDialog(){
        this.setState({openEditDialog : true})
    }

    handleCloseEditDialog(){
        this.setState({openEditDialog : false})
    }

    handleUpdateEditedTask(){
        const {editTaskId,editTaskDetail} = this.state
        const {editGoalTaskDetail,user} = this.props
        editGoalTaskDetail(editTaskId,editTaskDetail,user)
        debugger;
        this.setState({
            editTaskId: -1,editTaskDetail : "", openEditDialog : false
        })
    }

    handleOpenAddDialog(){
        this.setState({openAddTaskDialog: true})
    }

    handleCloseAddDialog(){
        this.setState({openAddTaskDialog: false})
    }



    render(){
        debugger;
        return(
            <PageDashboardInner {...this.props}
                open = {this.state.open}
                userGoalsMonths = {this.state.userGoalsMonths}
                dropDownValue = {this.state.dropDownValue}
                openDeleteDialog = {this.state.openDeleteDialog}
                taskId ={this.state.taskId}
                weeks = {this.state.weeks}
                openEditDialog = {this.state.openEditDialog}
                editTaskDetail = {this.state.editTaskDetail}
                openAddTaskDialog = {this.state.openAddTaskDialog}
                currentMonthYear = {this.state.currentMonthYear}
                handleDropDownValue = {this.handleDropDownValue}
                handleOpenDialog = {this.handleOpenDialog}
                handleCancelDialog ={this.handleCancelDialog}
                handleGoalDelete = {this.handleGoalDelete}
                handleTaskStatusDropdown = {this.handleTaskStatusDropdown}
                handleCloseDeleteDialog = {this.handleCloseDeleteDialog}
                handleOpenDeleteDialog = {this.handleOpenDeleteDialog}
                handleConfirmDeleteDialog = {this.handleConfirmDeleteDialog}
                handleDeleteTask = {this.handleDeleteTask}
                handleEditTask = {this.handleEditTask}
                handleOpenEditDialog = {this.handleOpenEditDialog}
                handleCloseEditDialog = {this.handleCloseEditDialog}
                handleEditingTaskDetail = {this.handleEditingTaskDetail}
                handleUpdateEditedTask = {this.handleUpdateEditedTask}
                handleOpenAddDialog = {this.handleOpenAddDialog}
                handleCloseAddDialog= {this.handleCloseAddDialog}
            />
        )
    }
}