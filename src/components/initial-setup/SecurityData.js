import React from 'react';
import Switch from '@material-ui/core/Switch';

export const SecurityData = props => {

    const container = {
        textAlign: 'center'
    }


    const formRow = {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: '1px #E0E5F6 solid',
        borderRadius: '10px',
        padding: '0 10px 0 10px'
    }


    return (
        <div style={container}>

        <div style={formRow}>
            <h4>{props.fields.inputParams[props.id] ? 'Disable' : 'Enable' }  {props.name}</h4>
            <Switch
            checked={props.fields.inputParams[props.id]}
            onChange={()=>props.formOnChange(props.id)}
            value={props.id}
            />
        </div>

        </div>

    )
}

export default SecurityData;