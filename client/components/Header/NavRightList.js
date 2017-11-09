import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { hashHistory } from 'react-router';
import { Link } from "react-router-dom";

const ImgIconButtonStyle = {
  width: '60px',
  height: '60px',
  color: 'white',
  lineHeight: '60px'
};

const listItemStyle = {
  paddingLeft: '50px' // 36 + 16, algin with sub list
};

class NavRightList extends React.Component {

  handleChange = (event, value) => {
    hashHistory.push(value);
  }

  render() {
    return (
      <ul className="list-unstyled float-right">
        <li style={{marginRight: '10px'}}>
          <IconMenu
            iconButtonElement={<IconButton style={ImgIconButtonStyle}><i className="material-icons">settings</i></IconButton>}
            onChange={this.handleChange}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            menuStyle={{minWidth: '150px'}}
                    >
            {/*<MenuItem
              value="/app/dashboard"
              primaryText="Dashboard"
              style={{fontSize: '14px', lineHeight: '48px'}}
              innerDivStyle={listItemStyle}
              leftIcon={<i className="material-icons">home</i>}
                        />
            <MenuItem
              value="/app/page/about"
              primaryText="About"
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">person</i>}
                        />*/}
            <Link to="/logout" className="color-primary"><MenuItem
              value="/logout"
              primaryText="Log Out"
              innerDivStyle={listItemStyle}
              style={{fontSize: '14px', lineHeight: '48px'}}
              leftIcon={<i className="material-icons">forward</i>}
                        /></Link>
          </IconMenu>
        </li>
      </ul>
    );
  }
}

module.exports = NavRightList;
