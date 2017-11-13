import React from 'react';
import {connect} from 'react-redux'

import {changeUsername} from '../../actions/entities/users'
import PageUserProfileInner from './PageUserProfileInner'

const mapStateToProps = (state,ownProps) =>{
    const {entities : {users}} = state
    const {auth : {user}} = state
    const userData = users[user]
    debugger;
    return {users,user,userData};
}

@connect(mapStateToProps,{changeUsername})

export default class PageUserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            openChangeNameDialog : false,
            userFistName : props.userData.firstName,
            userLastName : props.userData.lastName,
        }
        this.handleCloseChangeNameDialog = this.handleCloseChangeNameDialog.bind(this)
        this.handleOpenChangeNameDialog = this.handleOpenChangeNameDialog.bind(this)
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
        this.handleChangelastName = this.handleChangelastName.bind(this);
        this.handleUpdateUserName = this.handleUpdateUserName.bind(this)
    }

    handleOpenChangeNameDialog(){
        this.setState({openChangeNameDialog : true})
    }

    handleCloseChangeNameDialog(){
        this.setState({openChangeNameDialog : false})
    }

    handleChangeFirstName(event,newValue){
        this.setState({ userFistName : newValue})
    }


    handleChangelastName(event,newValue){
        this.setState({ userLastName : newValue})
    }

    handleUpdateUserName(){
        const {user,changeUsername} = this.props
        const {userFistName,userLastName} = this.state
        changeUsername(userFistName,userLastName,user)
        this.setState({
            openChangeNameDialog : false
        })
        debugger;
    }

    render(){
        return(
            <PageUserProfileInner
                {...this.props}
                openChangeNameDialog = {this.state.openChangeNameDialog}
                userFistName = {this.state.userFistName}
                userLastName = {this.state.userLastName}
                handleCloseChangeNameDialog = {this.handleCloseChangeNameDialog}
                handleOpenChangeNameDialog = {this.handleOpenChangeNameDialog}
                handleChangeFirstName = {this.handleChangeFirstName}
                handleChangelastName = {this.handleChangelastName}
                handleUpdateUserName = {this.handleUpdateUserName}
            />
        )
    }
}