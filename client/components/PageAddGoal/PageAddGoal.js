import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment'
//src
import PageAddGoalInner from './PageAddGoalInner'
import {addUserGoal} from '../../actions/entities/usergoals'


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

@connect(mapStateToProps,{addUserGoal})


export default class PageAddGoal extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            goalName : "",
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleGoalName = this.handleGoalName.bind(this);
    }

    handleCloseDialog(){
        const {handleCancelDialog} = this.props;
        if(this.state.goalName != "") {
            const {addUserGoal,user} = this.props;
            var weekday = moment(Date.now()).weekday();
            var goalDate =  moment(Date.now()).subtract(weekday,'days').valueOf();
            debugger;
            addUserGoal(user,this.state.goalName,goalDate)
            this.setState({goalName : ""})

            debugger;
        }
        debugger;
       handleCancelDialog();
        this.setState({goalName : ""})
    }

    handleGoalName(event,newValue){
        debugger;
        this.setState({goalName : newValue})
    }





    render(){
        return <PageAddGoalInner
            {...this.props}
            handleCloseDialog = {this.handleCloseDialog}
            handleGoalName = {this.handleGoalName}
        />
    }

}
