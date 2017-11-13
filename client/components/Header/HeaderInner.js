import React from 'react'
import { connect } from 'react-redux';
import { NavLink, Link, Route } from 'react-router-dom'
import classnames from 'classnames';
import { Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styles from './HeaderInner.scss';
import Spinner from 'react-spinner-material';
import DocumentTitle from 'react-document-title';
import QueueAnim from 'rc-queue-anim';
import PageLoading from '../PageLoading'

import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';


const PublicHeader = React.createClass ({
  getInitialState () {
    return {
      navExpanded: false
    }
  },

  setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  },

  closeNav() {
    this.setState({ navExpanded: false });
  },

  render() {
    return (
      <div>
        <Navbar fluid onToggle={this.setNavExpanded}
                expanded={this.state.navExpanded}
								className="my-navbar">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/login">Goals App</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    )
  }
});

const Logged = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <LinkContainer to="/userProfile"><MenuItem eventKey={1}>User Profile</MenuItem></LinkContainer>
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <LinkContainer to="/logout"><MenuItem eventKey={1}>Logout</MenuItem></LinkContainer>
    </IconMenu>
);

const PrivateHeader = React.createClass ({
  getInitialState () {
    return {
      navExpanded: false
    }
  },

  setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  },

  closeNav() {
    this.setState({ navExpanded: false });
  },

    handleLogout(){
      console.log("Logout function is called")
    },

  render() {
    return (
     <div>
         <AppBar
             title={<span style={{paddingLeft : 20}}>Goals App</span>}
             showMenuIconButton={false}
             iconElementRight={ <Logged handleLogout={this.handleLogout} /> }
         />
     </div>
    )
  }
});

const HeaderInner = (props) => {
	const { onToggle, expanded, fluid, onSelect, pullRight, eventKey, bsClass, bsStyle, user, isLogoutLoading } = props;

	return (
    <Choose>
			<When condition={ isLogoutLoading }>
        <PageLoading />
      </When>
			<Otherwise>
        <Choose>
          <When condition={ user }>
            <PrivateHeader user={ user } />
          </When>
          <Otherwise>
            <PublicHeader />
          </Otherwise>
        </Choose>
    </Otherwise>
		</Choose>
	);
}


export default HeaderInner;