import React from 'react';
import '../../../styles/Console.css';
import Chip from '@material-ui/core/Chip';
import AuthorizationIcon from '@material-ui/icons/Fingerprint';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import SetupIcon from '@material-ui/icons/SettingsBackupRestore';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SimpleDialog from '../SimpleDialog';

const GenerateAuthorizationCode = props => {


   const getSteps = () => {
        return [
            {
            'key': 'authCode',
            'complete' : props.authCode,
            'incomplete' : props.userData.generateTrialLicence ? 
                            'Generate a trial Authorization Code'
                            :'Generate an Authorization Code',}, 
            {
            'key': 'setting',
            'complete' : props.selectedSetting,
            'incomplete' : 'Select a Setting to link with the generated Authorization Code',},
        ];
      }
      
   const getStepContent = step => {
        switch (step) {
          case 0:
            return props.userData.generateTrialLicence ? 
                    `Generate your 14 days trial Authorization Code to 
                    access your Vistogram front end or click on "Purchase 
                    A Licence" below to upgrade.`
                   : (props.userData.licences - props.userData.activeLicences) <= 0 ?
                   `You have no active licences to generate an 
                   authorization code. Click on "Purchase 
                   A Licence" below to buy a licence.`
                   :`Generate an Authorization Code to access your 
                    Vistogram front end.`;
          case 1:
            return `For each Authorization code you generate you must 
                    attach one of your Settings. The device which uses 
                    this Authorization Code will display your Vistogram 
                    with this setting. This means that you can have 
                    different settings for different locations. Click on 
                    "SELECT" to link a setting to the Authorization Code,  
                    or click on "Configure New Setting" to create a new 
                    one.`;
          default:
            return 'Unknown step';
        }
      }

    const steps = getSteps();

    const nMP = {
        padding: '0',
        margin: '0',
    }

    const nMPa = {
      padding: '0 40px 0 20px',
      margin: '0',
  }

    const acButton = {
        marginTop: '30px'
    }

    const chipTitle = {
        padding: '0',
        margin: '0',
        fontSize: '8px',
        paddingLeft: '10px',
        color:'#253061'
    }

    const buttonTransform = {
        textTransform: 'none',
    }

    const settings = props.settingsArray;

    const generateButton = {
      textTransform: 'none',
      borderRadius: '100px',
      fontSize: '16px',
      width: '300px',
      color:'#253061',
      margin: '50px',
  }

  const generateButtonDiv = {
    textAlign: 'center',
  }


    return (
      !props.enableGAC && props.authCodeArray.length !== 0  ? <div style={generateButtonDiv}>
      <Button
          style={generateButton}
          variant="contained"
          color="secondary"
          onClick={props.handleEnableGAC}
      >
          Generate An Authorization Code
      </Button>
      </div> :
    <div className='console-authCodeDiv'>

        <Stepper activeStep={props.activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>
              {label.key === 'authCode' ? 
              <div>
              {props.authCode === '' ?
              <h4 style={nMP}>{label.incomplete}</h4> :
              <div>
                  <p style={chipTitle}>{props.userData.generateTrialLicence? 
                                        'Trial Authorization Code' 
                                        : 'Authorization Code'}</p>
              <Chip
                  className='console-genAuthCodeChip'
                  label={label.complete}
                  icon={<AuthorizationIcon />}
              /> 
              </div>
              } 
              </div>
              
              :

              <div>
              {props.selectedSetting === '' ?
              <h4 style={nMP}>{label.incomplete}</h4> :
              <div>
              <p style={chipTitle}>Selected Setting</p>
              <Chip
                  className='console-genAuthCodeChip'
                  label={label.complete}
                  icon={<SetupIcon />}
              /> 
              </div>
            } 
            </div>
              }
            
              </StepLabel>
              <StepContent>
                <p style={nMPa}>{getStepContent(index)}</p>
                <div>
                  <div style={acButton}>
                    <Button
                      // disabled={props.activeStep === 0}
                      onClick={props.activeStep === 0 ? 
                        props.handleEnableGAC : props.stepBack}
                    >
                      Back
                    </Button>
                    {(props.userData.generateTrialLicence || 
                      !(props.userData.licences - props.userData.activeLicences <= 0)) && 
                      <React.Fragment>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={props.stepNext}
                    >
                      {props.activeStep === 0 ? 'Generate' : 
                        props.activeStep === 1 ? 'Select': 'Submit'}
                    </Button>

                    {props.activeStep === 0 && 
                    (props.userData.generateTrialLicence || 
                    (props.userData.licences - props.userData.activeLicences <= 0)) && (
                    <Button disabled style={buttonTransform}> Or </Button>
                    )}
                  </React.Fragment>}
                    {props.activeStep === 0 && 
                    (props.userData.generateTrialLicence || 
                    (props.userData.licences - props.userData.activeLicences <= 0)) && (
                    <Button
                      variant="outlined"
                      style={buttonTransform}
                      color="primary"
                      onClick={props.goToLicencePage}
                    >
                      Purchase A Licence
                    </Button>
                    )}

                    {props.activeStep === 1 && (
                    <Button disabled style={buttonTransform}> Or </Button>
                    )}
                    {props.activeStep === 1 && (
                    <Button
                      variant="outlined"
                      style={buttonTransform}
                      color="primary"
                      onClick={props.goToSettingsPage}
                    >
                    Configure New Setting
                    </Button>
                    )}
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {props.activeStep === steps.length && (
          <div 
          style={{paddingLeft: '20px',}}
          >
            <p>{props.userData.generateTrialLicence ?
            'The Trial Authorization Code has been Linked to the Selected Setting'
            : 'The Authorization Code has been Linked to the Selected Setting'}</p>
            <div style={acButton}>
                    <Button
                      onClick={props.stepBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      // className='console-submitAuthCodeButton'
                      disabled={props.subAuthCodeButtonDisabled}
                      onClick={props.submitAuthCode}
                      // onClick={props.stepNext}
                    >
                      {props.subAuthCodeButtonLabel}
                    </Button>
                  </div>
          </div>
        )}

        <div>
          <SimpleDialog 
            openDialog={props.openSettingsDialog}
            handleOpenDialog={()=>props.handleOpenDialog('openSettingsDialog')}
            handleCloseDialog={()=>props.handleCloseDialog('openSettingsDialog')}
            dialogTitle={"Select a Setting"}
            dialogContentWidth='300px'
            dialogContentPadding='0 20px 20px 20px'
            dialogTitleColor='#253061'
            dialogContent={
              <RadioGroup
              aria-label="settingList"
              name="settingList"
              value={props.selectedSetting}
              onChange={props.selectSettings}
            >
            {settings.map(setting => (
              <FormControlLabel 
                  key={setting}         
                  value={setting} 
                  control={<Radio />} 
                  label={setting} 
                  />
            ))}
            </RadioGroup>
            }
          />
      </div>
  </div>
    )
};

export default GenerateAuthorizationCode;





