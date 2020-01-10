import React from 'react';
import SummaryArea from '../dashboardPage/SummaryArea';
import GraphArea from '../dashboardPage/GraphArea';

const DashboardPage = props => {
  return (
    <div>
        <SummaryArea 
          currentVisitors={props.currentVisitors}
          todayVisitors={props.todayVisitors}
          activeDevices={props.activeDevices}
          userData={props.userData}
        />
        <GraphArea />
    </div>
  )
}

export default DashboardPage;
