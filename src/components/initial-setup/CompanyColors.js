import React from 'react';
import { SketchPicker } from 'react-color';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';


export const CompanyColors = props => {


    const dialogTitle = {
        textAlign: 'center',
        color: '#253061'
    }

    const divider = {
        height: '40px',
        width: '1px',
        backgroundColor: 'grey',
        marginRight: '15px'
    }

    const color = {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: props.color,
    }


    return (
        <div>
        {/* <div style={colorDiv}> */}
            <TextField
                id={props.name}
                label={props.label}
                type={props.name}
                name={props.name}
                margin="normal"
                variant="outlined"
                value={props.color}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <div style={divider}></div>
                        <Button
                            size='small'
                            disableFocusRipple
                            disableRipple
                            onClick={props.click}
                            >
                        <div style={color}></div>
                        </Button>
                      </InputAdornment>
                    ),
                  }}

                  InputLabelProps={{
                    focused: props.focus
                  }}
            />
            

            <div>
                <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={props.dialogIsOpen}
                onClose={props.closeColorDialog}
                aria-labelledby="responsive-dialog-title"
                >
                <h4
                style={dialogTitle}
                >{'Select '+props.activeColorSelect}</h4>
                <DialogContent>
                <SketchPicker
                        color={props.activeColorSelect === 'Primary Color' ? 
                        props.pcpBkgColor : props.scpBkgColor}
                        disableAlpha
                        presetColors={props.presetColors}
                        onChangeComplete={props.handleSelectColor}
                    /> 

                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={props.closeColorDialog} color="primary">
                    Disagree
                    </Button> */}
                    <Button onClick={props.closeColorDialog} color="primary" autoFocus>
                    Okay
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        {/* </div> */}
        </div>
    )
}

export default CompanyColors;