import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import moment from 'moment'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const PageAddGoalInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open,handleGoalName} = props;
    const AddGoalActions = [
        <FlatButton
            label="Cancel"
            primary={false}
            onClick={handleCancelDialog}
        />,
        <FlatButton
            label="Add"
            primary={true}
            onClick={handleCloseDialog}
        />,
    ];
    return(
        <div>
            <Dialog
                title="Add Goal"
                actions={AddGoalActions}
                modal={false}
                open={open}
                onRequestClose={handleCloseDialog}
            >
                Please Add Your Goal
                <TextField
                    id="goalName"
                    floatingLabelText="Add Goal"
                    floatingLabelFixed
                    onChange={handleGoalName}
                    fullWidth
                />
            </Dialog>
        </div>
    )
}

export default PageAddGoalInner;