import React from 'react';

const FeaturesList = props => {

    const card = {
        // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        borderRadius: '20px',
        border: '1px solid #E0E5F6',
        padding: '20px',
        height: '300px',
        backgroundColor: 'rgba(255, 255, 255 , 1)',
    }

  return (
    <div style={card}>
        <div>{props.icon}</div>
        <h3 style={{margin:'0 0 5px 0', padding:'0', color: '#FFC233'}}>{props.title}</h3>
        <div style={{fontSize: '14px'}}>{props.body}</div>
    </div>
  )
}

export default FeaturesList;
