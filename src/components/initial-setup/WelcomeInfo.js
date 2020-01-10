import React from 'react';
import TextField from '@material-ui/core/TextField';

export const WelcomeInfo = props => {
  let multiline = false;
  if (props.multiline === 'multiline') {
    multiline = true
  } else {
    multiline = false
  }

    return (  
          <TextField
            fullWidth
            id={props.id}
            label={props.label}
            type={props.type}
            name={props.name}
            value={props.value}
            error={props.error}
            helperText={props.helperText}
            margin="normal"
            variant="outlined"
            multiline={multiline}
            rows={props.rows}
            onChange={props.onChange}

            InputLabelProps={{
              focused: props.focus
            }}
          />
    )
}

export default WelcomeInfo;
