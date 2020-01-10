import React from 'react';
import Margin from '../../components/Margin';
import TextField from '@material-ui/core/TextField';



export const CompanyInfo = props => {
    let arr = [];
    arr = props.bcArray

    return (
        <div>
        <h5>Basic Information</h5>
        <div className='setup-configure-fields'>
        <TextField
            id="institutionCategory"
            error={props.bcError}
            fullWidth
            select 
            label="Institution Category"
            value={props.bcValue}
            onChange={props.bcOnChange}
            helperText="Select your Institution Category"
            variant="outlined"

            SelectProps={{
                native: true,
              }}

            InputLabelProps={{
                focused: props.bcFocus
              }}
              
          >
            {arr.map(option => (
              <option key={option.id} value={option.label}>
                {option.label}
              </option>
            ))}
          </TextField>
          <Margin height='10px'/>
  
          <TextField
            id="businessSlogan"
            fullWidth
            label="Slogan"
            type="businessSlogan"
            name="businessSlogan"
            value={props.bsValue}
            helperText='Enter your slogan (Optional)'
            margin="normal"
            variant="outlined"
            onChange={props.bsOnChange}

            InputLabelProps={{
                focused: props.bsFocus
              }}
          />

        {props.bcValue === 'Multi-Tenant Office Building' ? <div>
        <Margin height='10px'/>
            <TextField
            id="multiOfficeTenants"
            fullWidth
            error={props.moError}
            label={[props.moArray.length === 0 ? "" : props.moArray.length] + " Multi-Office Tenants"}
            type="multiOfficeTenants"
            name="multiOfficeTenants"
            value={props.moValue}
            multiline
            rowsMax="15"
            helperText='Enter offices seperated by comma'
            margin="normal"
            variant="outlined"
            onChange={props.moOnChange}

            InputLabelProps={{
                focused: props.moFocus
              }}
            />
          </div> : null}
        </div>
        </div>
    )
}

export default CompanyInfo;
