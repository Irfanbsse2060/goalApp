//libs
import React from 'react';
import { connect } from 'react-redux';


//src
import PageAdminDashboardInner from './PageAdminDashboardInner'
import {fetchAllUsers} from '../../actions/entities/users'
import {getAllStatuses} from '../../actions/entities/statuses'


const mapStateToProps = (state, ownProps) => {
    const {feed : {allusers}} = state
    const {feed : {statuses : {statuses}}} = state
    return {allusers,statuses}
}

@connect(mapStateToProps,{fetchAllUsers,getAllStatuses})

export default class PageAdminDashboard extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {fetchAllUsers,getAllStatuses} = this.props;
        fetchAllUsers();
        getAllStatuses();
    }

    render(){
        return(
            <PageAdminDashboardInner {...this.props}/>
        )
    }
}