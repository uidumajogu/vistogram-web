import React from 'react';
import NoInviters from '../NoData';
import DisplayInverterData from './DisplayInviterData';


const InviteManagementPage = props => {

    let inviters = props.invitersData;

    const container = {
        // border: 'solid 1px #E0E5F6',
        margin: '20px 0 20px 0',
    }

    const gridContainerHeader  = {
        display: 'grid',
        gridTemplateColumns: '30% 30% 30% auto',
        // gridTemplateRows: '100px 300px',
        gridGap: '10px',
        backgroundColor: '#FFC233',
        padding: '10px 20px 10px 30px',
        // border: 'solid 1px #E0E5F6',
        // color: '#8934FF',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '14px'
      }

    const gridContainer  = {
        display: 'grid',
        gridTemplateColumns: '30% 30% 30% auto',
        // gridTemplateRows: '100px 300px',
        gridGap: '10px',
        // background-color: #2196F3;
        padding: '1px 10px 1px 10px',
        borderBottom: 'solid 1px #E0E5F6',
        borderLeft: 'solid 1px #E0E5F6',
        borderRight: 'solid 1px #E0E5F6',
        textAlign: 'left',
        alignItems:'center',
        fontSize: '14px'
      }
 
      const row = {
          display: 'flex',
          flexDirection: 'row',
          alignItems:'center',
      }



  return (
      <div>
    {inviters.length === 0 && !props.registerInvertersForm ? 
    <div>
      <NoInviters 
        message='Register Users to send invites'
        remark='No Users have been setup to send invites. 
        Click on the button below to register those authorized to
        invite people to your premises'
        clickChip={true}
        onClickChip={props.enableRegisterInvitersForm}
        /> </div>:
    <div>
        <DisplayInverterData
            invitersData={props.invitersData}
            userData={props.UserData}
            vRegStep={props.vRegStep}
            previousVRegStep={props.previousVRegStep}
            nextVRegStep={props.nextVRegStep}
            vRegistering={props.vRegistering}
            vRegister={props.vRegister}

            userID={props.userID}
            fullName={props.fullName}
            department={props.department}
            email={props.email}

            handleChange={(c)=>props.handleChange(c)}
            checkRegisterInputs={props.checkRegisterInputs}

            userIDError={props.userIDError}
            fullNameError={props.fullNameError}
            departmentError={props.departmentError}
            emailError={props.emailError}
            checkingEmail={props.checkingEmail}
        />
    </div>}
    </div>
    )
}

export default InviteManagementPage;
