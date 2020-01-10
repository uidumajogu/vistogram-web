import React from 'react';


const InputField = props => {

    const input = {
        width: '100%',
        fontSize: '10px',
        color: 'grey',
        borderRadius: '5px',
        padding: '3px',
        border: '1px grey solid',
        marginTop: '5px'
    }

    return (
        <div style={input}>
            {props.name}
        </div>
    )
};

export default InputField;