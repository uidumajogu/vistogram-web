import React from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';


const SimpleDialog = props => {

    const dialogTitle = {
        color: props.dialogTitleColor,
        fontSize: '14px',
        textAlign: 'center',
        marginTop: '10px',
        marginBottom: '5px',
        padding: '0',
    }

    const dialogBox = {
        width: props.dialogContentWidth,
        padding: props.dialogContentPadding
    }

  return (
    <div>
        <Dialog
        open={props.openDialog}
        keepMounted
        disableBackdropClick
        disableEscapeKeyDown
        onClose={props.handleCloseDialog}
        aria-labelledby="dialog"
        aria-describedby="dialog"
        >
        <h5 style={dialogTitle}>
            {props.dialogTitle}
        </h5>
        <DialogContent style={dialogBox}>
        {props.dialogContent}
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default SimpleDialog;
