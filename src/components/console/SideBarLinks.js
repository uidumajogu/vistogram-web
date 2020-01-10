import React from 'react';
import Margin from '../Margin';
import '../../styles/Console.css';
import Button from '@material-ui/core/Button';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import VisitorsIcon from '@material-ui/icons/SupervisorAccountOutlined';
import AuthorizationIcon from '@material-ui/icons/Fingerprint';
import LicencesIcon from '@material-ui/icons/SaveOutlined';
import InviteIcon from '@material-ui/icons/FolderSharedOutlined';
import SetupIcon from '@material-ui/icons/SettingsBackupRestore';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';


const SideBarLinks = (props) => {


    const activeColor = {
        color: '#8934FF'
    }

    const inActiveColor = {
        color: '#253061'
    }

    return (
        <div>

      <Button 
      className='console-sidebar-links'
      style={props.activeLink === 'dashboard' ? activeColor : inActiveColor}
      fullWidth
      size="large"
      variant="text"
      onClick={()=>props.click('dashboard', 'Dashboard')}
      >
      <DashboardIcon />
      <Margin
        height='100%'
        width='10px'/>
      Dashboard
    </Button>

    <Button 
      className='console-sidebar-links'
      style={props.activeLink === 'visitors' ? activeColor : inActiveColor}
      fullWidth
      size="large"
      variant="text"
      onClick={()=>props.click('visitors', 'Visitors Details')}
      >
      <VisitorsIcon />
      <Margin
        height='100%'
        width='10px'/>
      Visitors
    </Button>
    
    <Button 
      className='console-sidebar-links'
      style={props.activeLink === 'authorizationCode' ? activeColor : inActiveColor}
      fullWidth
      size="large"
      variant="text"
      onClick={()=>props.click('authorizationCode', 'Manage Your Authorization Codes')}
      >
      <AuthorizationIcon />
      <Margin
        height='100%'
        width='10px'/>
      Authorization Codes
    </Button>
{/* 
    <Button 
      className='console-sidebar-links'
      style={props.activeLink === 'devices' ? activeColor : inActiveColor}
      fullWidth
      size="large"
      variant="text"
      onClick={()=>props.click('devices', 'Devices on Vistogram')}
      >
      <DevicesIcon />
      <Margin
        height='100%'
        width='10px'/>
      Devices
    </Button> */}

  <Button 
      className='console-sidebar-links'
      style={props.activeLink === 'licences' ? activeColor : inActiveColor}
      fullWidth
      size="large"
      variant="text"
      onClick={()=>props.click('licences', 'Your Licences')}
      >
      <LicencesIcon />
      <Margin
        height='100%'
        width='10px'/>
      Licences
    </Button>

    <Button 
      className='console-sidebar-links'
      style={props.activeLink === 'inviteManagement' ? activeColor : inActiveColor}
      fullWidth
      size="large"
      variant="text"
      onClick={()=>props.click('inviteManagement', 'Manage Invites')}
      >
      <InviteIcon />
      <Margin
        height='100%'
        width='10px'/>
      Invite Management
    </Button>

    <Button 
      className='console-sidebar-links'
      style={props.activeLink === 'setup' ? activeColor : inActiveColor}
      fullWidth
      size="large"
      variant="text"
      onClick={props.goToSettingsPage}
      >
      <SetupIcon />
      <Margin
        height='100%'
        width='10px'/>
      Settings
    </Button>

    <Button 
      className='console-sidebar-links'
      style={props.activeLink === 'account' ? activeColor : inActiveColor}
      fullWidth
      size="large"
      variant="text"
      onClick={()=>props.click('account', 'Your Vistogram Account')}
      >
      <AccountIcon />
      <Margin
        height='100%'
        width='10px'/>
      Account
    </Button>
        </div>
    )
};

export default SideBarLinks;
  