import React from 'react';
import '../../../styles/Console.css';
import GenerateAuthorizationCode from '../authorizationCodePage/GenerateAuthorizationCode';
import DisplayAuthCodes from '../authorizationCodePage/DisplayAuthCodes';
import Margin from '../../Margin';
import NoDataIcon from '@material-ui/icons/AnnouncementTwoTone';




const AuthorizationCodePage = props => {
  
    return (
      <div>
      <GenerateAuthorizationCode 
        authCode={props.authCode}
        activeStep={props.activeStep}
        stepBack={props.stepBack}
        stepNext={props.stepNext}
        settingsListDialogSelect={props.settingsListDialogSelect}
        selectedSetting={props.selectedSetting}
        selectSettings={props.selectSettings}
        settingsArray={props.settingsArray}
        subAuthCodeButtonDisabled={props.subAuthCodeButtonDisabled}
        submitAuthCode={props.submitAuthCode}
        subAuthCodeButtonLabel={props.subAuthCodeButtonLabel}
        openSettingsDialog={props.openSettingsDialog}
        handleOpenDialog={props.handleOpenDialog}
        handleCloseDialog={props.handleCloseDialog}
        goToSettingsPage={props.goToSettingsPage}
        userData={props.userData}
        goToLicencePage={props.goToLicencePage}
        enableGAC={props.enableGAC}
        handleEnableGAC={props.handleEnableGAC}
        authCodeArray={props.authCodeArray}
      />

      <Margin
        height='20px'
        width='20px'/>

      {props.authCodeArray.length !== 0 ? <DisplayAuthCodes 
        authCodeArray={props.authCodeArray}
        deleteAuthCode={(d)=>props.deleteAuthCode(d)}
        openACDeleteDialog={props.openACDeleteDialog}
        handleOpenDialog={(d)=>props.handleOpenDialog(d)}
        handleCloseDialog={(d)=>props.handleCloseDialog(d)}
        handleACToDelete={(d)=>props.handleACToDelete(d)}
        acToDelete={props.acToDelete}
      /> : 
        <div style={{marginTop: '50px', textAlign: 'center'}}>
          <NoDataIcon 
            style={{color: 'E0E5F6', fontSize: '100px'}}
          />
          <div>
          No Authorization Codes, click on the "GENERATE" button above to create one.
          </div>
        </div>
      }
      </div>
    )
};

export default AuthorizationCodePage;





