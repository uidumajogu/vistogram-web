import React from 'react';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';

export const Form = props => {

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

    const fieldContainer = {
        width: '100%',
        borderRadius: '10px',
        padding: '10px',
        border: '1px #E0E5F6 solid',
    }

    const formFieldsRow = {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '12px',
    }

    const ffLabel = {
        margin: '20px 10px 2px 0',
        padding: '0',
        fontSize: '10px',
        fontWeigth: 'bold',
        color: '#6F728C',
        textAlign: 'right'
    }

    return (
        <div style={container}>

        <div style={formRow}>
            <h4>{props.fields.inputParams[props.id] ? 'Disable' : 'Enable'} {props.name}</h4> 
            <Switch
            disabled={props.id === '6tagForm'}
            checked={props.fields.inputParams[props.id]}
            onChange={()=>props.formOnChange(props.id, props.idf)}
            value={props.id}
            />
        </div>


        <p style={ffLabel}>{props.name} Fields</p>
        <div style={fieldContainer}>
        {props.fields[props.idf].map((field, index) => (
        <div 
            key={index}
            style={formFieldsRow}>
                <Checkbox
                disabled={!props.fields.inputParams[props.id] || props.id === '6tagForm' || field.field === 'Company'}
                checked={field.active}
                onChange={()=>props.fieldOnChange(props.id, props.idf, index)}
                value={field.field}
                />
                <p>{field.field}</p>
        </div>
        ))}
        </div>

        </div>

    )
}

export default Form;