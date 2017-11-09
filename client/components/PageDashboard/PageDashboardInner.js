//libs
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import moment from 'moment'

import Slider from 'material-ui/Slider';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import PageLoading from '../PageLoading';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip';
import Spinner from 'react-spinner-material';
import {tealA400} from 'material-ui/styles/colors';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'


//src
import './PageDashboardInner.scss'
import AddGoal from '../PageAddGoal/PageAddGoal'
import AddTask from '../PageAddTask/PageAddTask'

const PageDashboardInner = (props) =>{
    const {open,openAddTaskDialog,openEditDialog,editTaskDetail,userGoalsMonths,openDeleteDialog,weeks,currentMonthYear} = props;
    const {handleOpenDialog,handleCancelDialog,handleEditingTaskDetail,handleUpdateEditedTask,handleOpenEditDialog,handleCloseEditDialog,handleDropDownValue,dropDownValue,handleGoalDelete,handleTaskStatusDropdown,handleCloseDeleteDialog,handleOpenDeleteDialog,handleConfirmDeleteDialog,handleAddTaskSubmit,handleDeleteTask,handleEditTask,handleOpenAddDialog, handleCloseAddDialog} = props
    const {userGoals,isLoading,isAddingOrDeleting,statuses} = props;
    console.log(isLoading)
    debugger;
    const deleteActions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={handleCloseDeleteDialog}
        />,
        <FlatButton
            label="Ok"
            primary={true}
            onClick={handleConfirmDeleteDialog}
        />,
    ];

    const editActions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={handleCloseEditDialog}
        />,
        <FlatButton
            label="Update"
            primary={true}
            onClick={handleUpdateEditedTask}
        />,
    ];

    debugger;

    if(isLoading == true){
        return  <PageLoading/>
    }

    return (
       <div>
           {userGoals != "" ?
        <div>
            <div className="row">
                <div className="col-lg-10 user-wellcome">
                    <h3> Wellcome {userGoals.firstName} {userGoals.lastName} </h3>
                </div>
                <div className="col-lg-1 month-selection" >
                    {
                        userGoals.usergoals.map((goal,index) =>{
                            var userGoalsMonth = moment(goal.month);
                            var goalsMonth = userGoalsMonth.format('MMM')
                            var goalsYear = userGoalsMonth.format('YYYY');
                            var monthYear = goalsMonth+","+goalsYear;
                            if(userGoalsMonths.indexOf(monthYear)== -1){
                                userGoalsMonths.push(monthYear);
                            }
                        })
                    }
                    <DropDownMenu value={dropDownValue} onChange={handleDropDownValue}>
                        {userGoalsMonths.map((month,index)=>{
                            debugger;
                            return(
                                <MenuItem value={month} primaryText={month} />
                            )
                        })}
                    </DropDownMenu>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12 monthly-goals">
                    <Paper>
                        <div className="row">
                            <div className="col-lg-10">
                                <h3 >Monthly Goals</h3>
                            </div>
                               <div className="col-lg-1 addButton">
                                   {currentMonthYear == dropDownValue ?
                                    <FloatingActionButton onTouchTap={handleOpenDialog}>
                                        <ContentAdd  />
                                    </FloatingActionButton>
                                       : <div></div>}

                                   <AddGoal
                                     open = {open}
                                     handleCancelDialog = {handleCancelDialog}
                                   />
                                    <Dialog
                                        title="Confirm?"
                                        actions={deleteActions}
                                        modal={false}
                                        open={openDeleteDialog}
                                        onRequestClose={handleCloseDeleteDialog}
                                    >
                                        Please click OK to delete
                                    </Dialog>
                                </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-10 goalsList " >
                                <div className="row">
                                {
                                    isAddingOrDeleting ?
                                        <div className="col-lg-12 delete-spinner" ><Spinner size={40}
                                                                    spinnerColor={"#333"}
                                                                    spinnerWidth={2}
                                                                    show={true} />
                                                                       </div>:
                                    userGoals.usergoals.map((goal,index)=>{
                                    var userGoalsMonth = moment(goal.month);
                                    var goalsMonth = userGoalsMonth.format('MMM')
                                    var goalsYear = userGoalsMonth.format('YYYY');
                                    var monthYear = goalsMonth+","+goalsYear;
                                    if(monthYear == dropDownValue)
                            return (
                                <div className="monthly-single-goal">
                                    {currentMonthYear ==dropDownValue ?
                                        <Chip backgroundColor={"#bde3e8"}
                                            onRequestDelete={() => handleGoalDelete(goal.id)}
                                        >
                                            {goal.goalname}
                                        </Chip>
                                            :
                                        <Chip backgroundColor={"#bde3e8"}
                                        >
                                            {goal.goalname}
                                        </Chip>
                                    }
                                </div>
                            )

                        })

                                }
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>


    <div className="row">
        <div className="col-lg-10">

        </div>
        <div className="col-lg-2">
            {currentMonthYear == dropDownValue ?
            <RaisedButton
                label="+ New Task"
                secondary
                fullWidth
                onTouchTap={handleOpenAddDialog}
                labelStyle={{textTransform: 'none'}}
                style={{width: '100%'}}/>
                : <div></div>}
        </div>
    </div>




           <div className="row">
                <div className="col-lg-12">
                    {  userGoals.usergoals.map((goal, index) => {
                      /!*  var weekNumber = moment(goal.month).week()*!/
                        var startDate = moment(goal.month).format("DD/MM")
                        var endDate = moment(goal.month).add(6, 'days').format("DD/MM")
                        var userGoalsMonth = moment(goal.month);
                        var goalsMonth = userGoalsMonth.format('MMM')
                        var goalsYear = userGoalsMonth.format('YYYY');
                        var monthYear = goalsMonth + "," + goalsYear;

                      {/*  var currentMonth = moment(Date.now()).format('MMM')
                        var currentYear = moment(Date.now()).format('YYYY');
                        var currentMonthYear =  currentMonth + "," + currentYear;*/}


                        if (monthYear == dropDownValue)

                            return (
                                goal.goaltasks.map((task, index1) => {
                                    var taskcomp = task.taskcompletionpercentage / 100;
                                    var weekNumber = moment(task.weeknumber).week()


                                    return <Paper>
                                        <div className="row">
                                            <div className="col-lg-2  week-div" >
                                                <h6 className="week-displayed"> Week {weekNumber} </h6>
                                                {startDate} to {endDate}
                                            </div>
                                            <div className="col-lg-3 goal-in-list">
                                                <ListItem style={{marginTop : 4}}
                                                          disabled={true}
                                                          key={1}
                                                          primaryText={goal.goalname}
                                                />
                                            </div>
                                            <div className="col-lg-3 ">
                                                <h6 >{task.taskdetail}</h6>
                                            </div>
                                            <div className="col-lg-1">
                                                {currentMonthYear == dropDownValue ?
                                                    <DropDownMenu autoWidth={false} disabled={currentMonthYear ==dropDownValue ? false : true}  value={task.statusid} onChange={(e,index,value)=>handleTaskStatusDropdown(e,index,value,task.id,goal.id)}
                                                                  style={{width : 160}}
                                                    >
                                                        {statuses.map((status,index)=>{
                                                            debugger;
                                                            if(status.type != "Move")
                                                                return  <MenuItem  value={status.id} primaryText={status.type} />
                                                        })}
                                                    </DropDownMenu> :
                                                    <DropDownMenu autoWidth={false}   value={task.statusid} onChange={(e,index,value)=>handleTaskStatusDropdown(e,index,value,task.id,goal.id)}
                                                                  style={{width : 160}}
                                                    >
                                                        {statuses.map((status,index)=>{
                                                            if((status.type == "Move") && (status.id == task.statusid))
                                                                return  <MenuItem  value={status.id} primaryText="Moved" />
                                                            else if((status.type == "Move") || (status.id == task.statusid))
                                                                return  <MenuItem  value={status.id} primaryText={status.type} />
                                                        })}
                                                    </DropDownMenu>
                                                }
                                           {/*     <DropDownMenu autoWidth={false} disabled={currentMonthYear ==dropDownValue ? false : true}  value={task.statusid} onChange={(e,index,value)=>handleTaskStatusDropdown(e,index,value,task.id,goal.id)}
                                                style={{width : 160}}
                                                >
                                                    {statuses.map((status,index)=>{
                                                        if(status.type != "Move")
                                                      return  <MenuItem  value={status.id} primaryText={status.type} />
                                                    })}
                                                </DropDownMenu>*/}

                                            </div>
                                            {currentMonthYear == dropDownValue ?
                                            <div className="col-lg-2 delete-task-icon">
                                                <IconButton
                                                >
                                                    <ActionDelete
                                                        onClick={() =>handleDeleteTask(task.id)}
                                                    />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() =>handleEditTask(task.id,task.taskdetail)}
                                                >
                                                    <ActionEdit />
                                                </IconButton>
                                                <Dialog
                                                    title="Edit Task"
                                                    actions={editActions}
                                                    modal={false}
                                                    open={openEditDialog}
                                                    onRequestClose={handleCloseEditDialog}
                                                >
                                                    <TextField
                                                        id="editTask"
                                                        floatingLabelText="Edit Task"
                                                        floatingLabelFixed
                                                        multiLine
                                                        value={editTaskDetail}
                                                        onChange={(e,value) =>handleEditingTaskDetail(e,value)}
                                                        fullWidth
                                                    />
                                                </Dialog>
                                            </div>
                                                : <div></div> }
                                        </div>
                                        <Divider />
                                    </Paper>

                                }) )


                    })
                    }
                </div>
            </div>

          {/*  <div>
                <Table >
                    <TableHeader  displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow style={{textAlign : 'left'}}>
                            <TableHeaderColumn>Week</TableHeaderColumn>
                            <TableHeaderColumn>Goal Name</TableHeaderColumn>
                            <TableHeaderColumn>Task Description</TableHeaderColumn>
                            <TableHeaderColumn>Task Status</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}  >
                        {  userGoals.usergoals.map((goal, index) => {
                            /!*  var weekNumber = moment(goal.month).week()*!/
                            var startDate = moment(goal.month).format("DD/MM")
                            var endDate = moment(goal.month).add(6, 'days').format("DD/MM")
                            var userGoalsMonth = moment(goal.month);
                            var goalsMonth = userGoalsMonth.format('MMM')
                            var goalsYear = userGoalsMonth.format('YYYY');
                            var monthYear = goalsMonth + "," + goalsYear;

                            var currentMonth = moment(Date.now()).format('MMM')
                            var currentYear = moment(Date.now()).format('YYYY');
                            var currentMonthYear =  currentMonth + "," + currentYear;

                            if (monthYear == dropDownValue)

                                return (
                                    goal.goaltasks.map((task, index1) => {
                                        var taskcomp = task.taskcompletionpercentage / 100;
                                        var weekNumber = moment(task.weeknumber).week()


                                        return <Paper>
                                            <TableRow>
                                                <TableRowColumn>
                                                    {startDate} to {endDate}
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    { goal.goalname}
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    {task.taskdetail}
                                                </TableRowColumn>
                                                <TableRowColumn >
                                                    <DropDownMenu autoWidth={false} value={task.statusid} onChange={(e,index,value)=>handleTaskStatusDropdown(e,index,value,task.id,goal.id)}
                                                                  style={{width : 160,display : 'inlineFlex'}}
                                                    >
                                                        {statuses.map((status,index)=>{
                                                            return  <MenuItem  value={status.id} primaryText={status.type} />
                                                        })}
                                                    </DropDownMenu>
                                                </TableRowColumn>
                                                {currentMonthYear == dropDownValue ?
                                                    <TableRowColumn style={{paddingTop : 5}}>
                                                        <IconButton
                                                        >
                                                            <ActionDelete
                                                                onClick={() =>handleDeleteTask(task.id)}
                                                            />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() =>handleEditTask(task.id,task.taskdetail)}
                                                        >
                                                            <ActionEdit />
                                                        </IconButton>
                                                        <Dialog
                                                            title="Edit Task"
                                                            actions={editActions}
                                                            modal={false}
                                                            open={openEditDialog}
                                                            onRequestClose={handleCloseEditDialog}
                                                        >
                                                            <TextField
                                                                id="editTask"
                                                                floatingLabelText="Edit Task"
                                                                floatingLabelFixed
                                                                multiLine
                                                                value={editTaskDetail}
                                                                onChange={(e,value) =>handleEditingTaskDetail(e,value)}
                                                                fullWidth
                                                            />
                                                        </Dialog>
                                                    </TableRowColumn>
                                                    : <div></div> }
                                            </TableRow>
                                            <Divider />
                                        </Paper>

                                    }) )


                        })
                        }
                    </TableBody>
                </Table>
            </div>*/}
            <div>
                <AddTask weeks={weeks}
                         dropDownValue = {dropDownValue}
                         userGoals = {userGoals}
                         handleCloseAddDialog = {handleCloseAddDialog}
                         handleOpenAddDialog = {handleOpenAddDialog}
                         openAddTaskDialog ={openAddTaskDialog}
                />
            </div>

        </div>
               : <div></div>}
       </div>
    )
}

export default PageDashboardInner;