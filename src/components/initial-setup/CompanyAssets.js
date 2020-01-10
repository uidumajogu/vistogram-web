import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import IconButton from '@material-ui/core/IconButton';

export const CompanyAssets = props => {
    
    let bd = 'none';

    if (props.type === 'file') {
        bd = 'none';
    } else {
        bd = 'inline-block';
    }

    const imagePreview = {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
    }

    const noImagePreview ={
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        border: '1px solid #E0E5F6'
    }

    const container = {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    }

    const inputContainer = {
        width: '100%',
    }

    const input = {
        fontSize: '14px',
    }

    const deleteButton = {
        color: 'red',
        display: bd,
        width: '50px',
        height: '50px',
        marginLeft: '-10px',
    }

    return (
        <div style={container}>
        <div style={inputContainer}>
        <TextField
                id={props.name}
                label={props.label}
                type={props.name}
                name={props.name}
                margin="normal"
                variant="outlined"
                fullWidth
                title="&nbsp;"
                error={props.error}
                helperText={props.helperText}
                onChange={props.onChange}
                InputProps={{
                    style: input,
                    accept: props.type === 'file' ? "image/*" : "",
                    readOnly: true,
                    type: props.type,
                    value: props.value,
                    endAdornment: (
                        
                        <InputAdornment position="end">
                        {props.type !== 'file' ? 
                        <img
                        style={imagePreview} 
                        src={props.src}
                       alt={props.value}
                        /> : <div style={noImagePreview}></div> }
                      </InputAdornment> 
                    ),
                  }}

                  InputLabelProps={{
                    shrink: true,
                    focused: props.focus
                  }}

            />
            </div>

            <IconButton 
                style={deleteButton}
                aria-label="Delete"
                onClick={props.onDelete}
                >
                <CloseOutlinedIcon />
            </IconButton>

        </div>

    )
}

export default CompanyAssets;