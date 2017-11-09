import React from 'react';
import {connect} from 'react-redux'

//src
import PageAddTaskInner from './PageAddTaskInner'
import {addGoalTask} from '../../actions/entities/goalTasks'


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

@connect(mapStateToProps,{addGoalTask})


export default class PageAddTask extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            weeks : [],
            selectGoalDropDownValue : -1,
            selectMonthDropDownValue : -1,
            addTaskUserGoalId : -1,
            addTaskWeek : -1,
            addTaskName : "",
            estimatedHours : 2.0,
        }
        this.handleAddTaskGoal = this.handleAddTaskGoal.bind(this)
        this.handleAddTaskWeek = this.handleAddTaskWeek.bind(this)
        this.handleAddTaskSubmit = this.handleAddTaskSubmit.bind(this);
        this.handleAddTaskName = this.handleAddTaskName.bind(this);
        this.handleEstimatedHours = this.handleEstimatedHours.bind(this);
    }

    handleAddTaskGoal(event,index,value){
        this.setState({addTaskUserGoalId : value,selectGoalDropDownValue : value})
        debugger;
    }

    handleAddTaskWeek(event,index,value){
        const {weeks} = this.props
        var taskWeek = weeks[value].startDate
        this.setState({addTaskWeek : taskWeek,selectMonthDropDownValue : value})
        debugger;
    }

    handleAddTaskName(event){
        console.log(event.target.value)
        this.setState({addTaskName : event.target.value})

        debugger;
    }

    handleEstimatedHours (value) {
       this.setState({estimatedHours : value})
              debugger;
    }

    handleAddTaskSubmit (){
        const {addTaskWeek,addTaskUserGoalId, addTaskName,estimatedHours} = this.state
        const {addGoalTask,user,handleCloseAddDialog} = this.props
        debugger;

        if(addTaskWeek != -1 && addTaskUserGoalId!= -1 && addTaskName != ""  &&  estimatedHours != 0.0) {
            addGoalTask(addTaskName,addTaskWeek,estimatedHours,addTaskUserGoalId,user)
            debugger;
            this.setState({
                addTaskWeek : -1,
                addTaskUserGoalId : -1,
                addTaskName  : "",
                selectMonthDropDownValue : -1,
                selectGoalDropDownValue : -1,
                estimatedHours : 2.0
            })
            handleCloseAddDialog();
        }
        debugger;
    }


    render(){
        return <PageAddTaskInner
            {...this.props}
            selectGoalDropDownValue = {this.state.selectGoalDropDownValue}
            selectMonthDropDownValue = {this.state.selectMonthDropDownValue}
            addTaskName = {this.state.addTaskName}
            estimatedHours = {this.state.estimatedHours}
            handleAddTaskGoal = {this.handleAddTaskGoal}
            handleAddTaskWeek = {this.handleAddTaskWeek}
            handleAddTaskSubmit = {this.handleAddTaskSubmit}
            handleAddTaskName = {this.handleAddTaskName}
            handleEstimatedHours = {this.handleEstimatedHours}
        />
    }

}
