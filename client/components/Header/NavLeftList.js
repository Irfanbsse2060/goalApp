import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import Divider from 'material-ui/Divider';
import { Link } from "react-router-dom";
import { renderMenuItem } from '../../utils';

const HeaderIconButtonStyle = {
  //width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingRight: '20px', // 36 + 16, algin with sub list
  lineHeight: '60px',
  color: '#42A5F5'
};

class NavLeftList extends React.Component {

  handleChange = (event, value) => {
    hashHistory.push(value);
  }

  render() {
    return (
      <ul className="list-unstyled list-inline">
        <Link to="/system">
          <li className="list-inline-item" style={listItemStyle}>Transactions</li>
        </Link>
        <Link to="/account">
          <li className="list-inline-item" style={listItemStyle}>Account</li>
        </Link>

        {/*<li className="list-inline-item" >
          <Link to="/system" style={{textDecoration: 'none'}}><MenuItem primaryText="Transaction" style={{lineHeight: '60px', color: '#2196F3'}}/></Link>
          <Link to="/account" style={{textDecoration: 'none'}}><MenuItem primaryText="Account" style={{lineHeight: '60px', color: '#2196F3'}}/></Link>
          
          <Link to="/system" className="color-primary" style={{textDecoration: 'none', lineHeight: '60px'}}>Transactions</Link>
          <span className="divider-pipe" />
          <Link to="/account" className="color-primary">My Account</Link>
        </li>
        <li className="list-inline-item" style={listItemStyle}>
          <Link to="/account" className="color-primary" style={{textDecoration: 'none', lineHeight: '60px'}}>My Account</Link>
        </li>*/}
      </ul>
    );
  }
}

module.exports = NavLeftList;
