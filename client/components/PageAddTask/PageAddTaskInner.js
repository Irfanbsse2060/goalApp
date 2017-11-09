import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import moment from 'moment'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import NumericInput from 'react-numeric-input';

const PageAddTaskInner = (props) =>{
    const {weeks,userGoals,addTaskName,estimatedHours,selectGoalDropDownValue,dropDownValue,selectMonthDropDownValue,openAddTaskDialog,handleCloseAddDialog,handleAddTaskGoal,handleAddTaskWeek,handleOpenAddDialog,handleAddTaskSubmit,handleAddTaskName,handleEstimatedHours} = props;
    console.log("weeks is")
    console.log(weeks)
    const AddActions = [
        <FlatButton
            label="Cancel"
            primary={false}
            onClick={handleCloseAddDialog}
        />,
        <FlatButton
            label="Add"
            primary={true}
            onClick={handleAddTaskSubmit}
        />,
    ];
    return(
        <div>
            <Dialog
                title="Add Goal"
                actions={AddActions}
                open={openAddTaskDialog}

            >
           <div className="container-fluid">
               <div className="row">
                   <div className="col-lg-12">
                       <div className="row">
                           <div className="col-sm-12">
                               <TextField
                                   id="taskName"
                                   floatingLabelText="Task Name"
                                   floatingLabelFixed
                                   fullWidth
                                   multiLine
                                   value={addTaskName}
                                   onChange={handleAddTaskName}
                               />
                           </div>
                       </div>

                       <div className="row">
                           <div className="col-sm-6">
                               <DropDownMenu  value={selectGoalDropDownValue} onChange={handleAddTaskGoal}
                                             style={{width : 250}}
                                             autoWidth={false}
                               >
                                   <MenuItem value={-1} primaryText="Select Goal" />
                                   {
                                       userGoals.usergoals.map((goal,index)=>{
                                           var userGoalsMonth = moment(goal.month);
                                           var goalsMonth = userGoalsMonth.format('MMM')
                                           var goalsYear = userGoalsMonth.format('YYYY');
                                           var monthYear = goalsMonth+","+goalsYear;
                                           if(monthYear == dropDownValue)
                                           {
                                               return  <MenuItem value={goal.id} primaryText={goal.goalname} />
                                           }

                                       })
                                   }
                               </DropDownMenu>
                           </div>
                           <div className="col-sm-6">
                               <DropDownMenu value={selectMonthDropDownValue}  onChange={handleAddTaskWeek}
                                             style={{width : 250}}
                                             autoWidth={false}
                               >
                                   <MenuItem value={-1} primaryText="Select Week" />
                                   {weeks.map((week,index) =>{
                                       var startDate1 = moment(week.startDate).format("DD/MM")
                                       var weekNo = moment(week.startDate).week()
                                       var endDate1 = moment(week.endDate).format("DD/MM")
                                       return  <MenuItem value={index} primaryText={"Week "+weekNo+" "+startDate1 +" To "+endDate1} />
                                   })}
                               </DropDownMenu>
                           </div>
                       </div>
                        <br/>
                       <div className="row">
                           <div className="col-sm-3" >
                               Estimated Hours
                           </div>
                           <div className="col-sm-3" >
                               <NumericInput step={0.25} precision={2} value={estimatedHours} min={0.5} max={10} size={1} readOnly={true} onChange={handleEstimatedHours}/>
                           </div>
                       </div>

                   </div>
               </div>
           </div>
            </Dialog>
        </div>
    )
}

export default PageAddTaskInner;