import React from 'react';

const SummaryArea = props => {
  return (
    <div>
        <div className='console-visitor-summary'>
        <div className='console-visitor-now'>
        <div>
            Visitors Right Now
        </div>
        <h1 
            style={{
                fontSize: '60px', 
                color: '#ffffff', 
                textAlign: 'center'
                }}>
                {props.currentVisitors}
                </h1>
        </div>
        
        <div className='console-visitor-period'>
        <div>
            Visitors Today
        </div>
        <h1 
            style={{
                fontSize: '60px', 
                // color: '#ffffff', 
                textAlign: 'center'
                }}>
                {props.todayVisitors}
        </h1>

        </div>

        <div className='console-activeDevices'>
        <div>
            Active Devices
        </div>
        <h1 
            style={{
                fontSize: '50px', 
                color: '#8934FF', 
                textAlign: 'center'
                }}>
                {props.activeDevices} 
                <span style={{fontSize: '60px', textAlign: 'center'}}> / </span> 
                {props.userData.licences === 0 ? props.activeDevices : props.userData.licences}
        </h1>
        </div>

      </div>
      
    </div>
  )
}

export default SummaryArea;
