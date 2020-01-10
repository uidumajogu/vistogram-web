const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var db = admin.firestore();
var mailgun = require('mailgun-js')({apiKey:'9a345f9c66d71c03088669a19873e28b-2b778fc3-08a5da1e', domain:'vistocode.com'})


exports.deleteAnonymousUser = functions.firestore
    .document('licenceCodes/{authCode}')
    .onUpdate((change, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = change.after.data();

      // ...or the previous value before this update
      const previousValue = change.before.data();

      if (newValue.rAID && !previousValue.rAID) {
        admin.auth().deleteUser(newValue.AID)
            .then(data=> {
                console.log('The anonymous user '+newValue.AID+' was deleted');
                return 0;
            })
            .catch(error=>{
                console.log('Error deleting anonymous user:', error);
            });
        
        db.collection('anonymousUsers').doc(newValue.AID).delete()
            .then(data=>{
            console.log('The data for the anonymous user '+newValue.AID+' was deleted');
            return 0;
        })            
        .catch(error=>{
            console.log('Error deleting anonymous user data:', error);
        });
        
      }
    });


    exports.createVistocodeUser = functions.firestore
    .document('vistocodeUsers/{docID}')
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();

      // access a particular field as you would any JS property
      const id = newValue.docID;
      const email = newValue.email;
      const sku = newValue.sku;
      const fullName = newValue.fullName;
      const firstName = fullName.substr(0, fullName.indexOf(' ')); 
      const businessName = newValue.businessName;
      const copyRightYear = newValue.createdDate.substr(0, newValue.createdDate.indexOf('-'));

      // perform desired operations ...
      admin.auth().createUser({
        uid: id,
        email: email,
        emailVerified: true,
        password: sku,
        displayName: fullName,
        disabled: false
      }).then(data=>{
        var emailData = {
            from: 'Vistocode <welcome@vistocode.com>',
            to: email,
            subject: 'Welcome to Vistocode',
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html style="width:100%;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
             <head> 
              <meta charset="UTF-8"> 
              <meta content="width=device-width, initial-scale=1" name="viewport"> 
              <meta name="x-apple-disable-message-reformatting"> 
              <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
              <meta content="telephone=no" name="format-detection"> 
              <title>Vistocode welcome email</title> 
              <!--[if (mso 16)]>    <style type="text/css">    a {text-decoration: none;}    </style>    <![endif]--> 
              <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
              <!--[if !mso]><!-- --> 
              <link href="https://fonts.googleapis.com/css?family=Merriweather:400,400i,700,700i" rel="stylesheet"> 
              <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,400i,700,700i" rel="stylesheet"> 
              <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet"> 
              <!--<![endif]--> 
              <style type="text/css">
            @media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button { font-size:20px!important; display:inline-block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } .es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
            #outlook a {
                padding:0;
            }
            .ExternalClass {
                width:100%;
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
                line-height:100%;
            }
            .es-button {
                mso-style-priority:100!important;
                text-decoration:none!important;
            }
            a[x-apple-data-detectors] {
                color:inherit!important;
                text-decoration:none!important;
                font-size:inherit!important;
                font-family:inherit!important;
                font-weight:inherit!important;
                line-height:inherit!important;
            }
            .es-desk-hidden {
                display:none;
                float:left;
                overflow:hidden;
                width:0;
                max-height:0;
                line-height:0;
                mso-hide:all;
            }
            </style> 
             </head> 
             <body style="width:100%;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"> 
              <div class="es-wrapper-color" style="background-color:#FFFFFF;"> 
               <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"><v:fill type="tile" color="#ffffff" origin="0.5, 0" position="0.5,0"></v:fill></v:background><![endif]--> 
               <table class="es-wrapper" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;" width="100%" cellspacing="0" cellpadding="0"> 
                 <tr style="border-collapse:collapse;"> 
                  <td valign="top" style="padding:0;Margin:0;"> 
                   <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"> 
                     <tr style="border-collapse:collapse;"> 
                      <td align="center" style="padding:0;Margin:0;"> 
                       <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" align="center"> 
                         <tr style="border-collapse:collapse;"> 
                          <td align="left" style="padding:0;Margin:0;"> 
                           <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                             <tr style="border-collapse:collapse;"> 
                              <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> 
                               <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#FFF4F7;border-radius:3px;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fff4f7"> 
                                 <tr style="border-collapse:collapse;"> 
                                  <td bgcolor="#FDA203" align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;"> 
                                   <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                                     <tr style="border-collapse:collapse;"> 
                                      <td style="padding:0;Margin:0px;border-bottom:1px solid #FDA203;background:none 0% 0% repeat scroll rgba(0, 0, 0, 0);height:1px;width:100%;margin:0px;"></td> 
                                     </tr> 
                                   </table> </td> 
                                 </tr> 
                               </table> </td> 
                             </tr> 
                             <tr style="border-collapse:collapse;"> 
                              <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> 
                               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                                 <tr style="border-collapse:collapse;"> 
                                  <td align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px;"> <a href="https://vistocode.com" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img src="https://vistogram.com/images/vcLogo.png" alt="Vistocode" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="Vistocode" class="adapt-img" height="106"></a> </td> 
                                 </tr> 
                               </table> </td> 
                             </tr> 
                           </table> </td> 
                         </tr> 
                       </table> </td> 
                     </tr> 
                   </table> 
                   <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> 
                     <tr style="border-collapse:collapse;"> 
                      <td align="center" style="padding:0;Margin:0;"> 
                       <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff"> 
                         <tr style="border-collapse:collapse;"> 
                          <td align="left" style="padding:0;Margin:0;"> 
                           <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                             <tr style="border-collapse:collapse;"> 
                              <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> 
                               <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:3px;background-color:#FCFCFC;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fcfcfc"> 
                                 <tr style="border-collapse:collapse;"> 
                                  <td bgcolor="#fcfcfc" align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;"> <h1 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#333333;">Hi ${firstName},</h1><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;"><br></p> </td> 
                                 </tr> 
                                 <tr style="border-collapse:collapse;"> 
                                  <td bgcolor="#fcfcfc" align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;">You have been setup on Vistocode to invite your visitors or guests to ${businessName}. Your login information is as follows:</p> </td> 
                                 </tr> 
                               </table> </td> 
                             </tr> 
                           </table> </td> 
                         </tr> 
                         <tr style="border-collapse:collapse;"> 
                          <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;background-color:#FCFCFC;" bgcolor="#fcfcfc" align="left"> 
                           <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                             <tr style="border-collapse:collapse;"> 
                              <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> 
                               <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-left:1px solid #8934FF;border-right:1px solid #8934FF;border-top:1px solid #8934FF;border-bottom:1px solid #8934FF;border-radius:3px;background-color:#FFFFFF;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff"> 
                                 <tr style="border-collapse:collapse;"> 
                                  <td align="left" style="padding:0;Margin:0;padding-bottom:15px;padding-top:20px;padding-left:40px;"> <h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:18px;font-style:normal;font-weight:normal;color:#333333;">Your login information:</h3> </td> 
                                 </tr> 
                                 <tr style="border-collapse:collapse;"> 
                                  <td align="left" style="padding:0;Margin:0;padding-left:40px;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#253061;">Email: ${email}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#253061;">Password: ${sku}</p><p></p> </td> 
                                 </tr> 
                               </table> </td> 
                             </tr> 
                           </table> </td> 
                         </tr> 
                       </table> </td> 
                     </tr> 
                   </table> 
                   <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> 
                     <tr style="border-collapse:collapse;"> 
                      <td align="center" style="padding:0;Margin:0;"> 
                       <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FCFCFC;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
                         <tr style="border-collapse:collapse;"> 
                          <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-bottom:25px;padding-top:40px;"> 
                           <!--[if mso]><table width="560" cellpadding="0"                             cellspacing="0"><tr><td width="274" valign="top"><![endif]--> 
                           <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;"> 
                             <tr style="border-collapse:collapse;"> 
                              <td class="es-m-p0r es-m-p20b" width="254" align="center" style="padding:0;Margin:0;"> 
                               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                                 <tr style="border-collapse:collapse;"> 
                                  <td align="left" style="padding:0;Margin:0;"> <h3 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:17px;font-style:normal;font-weight:normal;color:#333333;">Download Vistocode and start inviting.</h3> </td> 
                                 </tr> 
                               </table> </td> 
                              <td class="es-hidden" width="20" style="padding:0;Margin:0;"></td> 
                             </tr> 
                           </table> 
                           <!--[if mso]></td><td width="133" valign="top"><![endif]--> 
                           <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;"> 
                             <tr style="border-collapse:collapse;"> 
                              <td class="es-m-p20b" width="133" align="center" style="padding:0;Margin:0;"> 
                               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                                 <tr style="border-collapse:collapse;"> 
                                  <td align="center" style="padding:0;Margin:0;"> <img src="https://gpcmq.stripocdn.email/content/guids/CABINET_e48ed8a1cdc6a86a71047ec89b3eabf6/images/92051534250512328.png" alt="App Store" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" class="adapt-img" title="App Store" width="133"></td> 
                                 </tr> 
                               </table> </td> 
                             </tr> 
                           </table> 
                           <!--[if mso]></td><td width="20"></td><td width="133" valign="top"><![endif]--> 
                           <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;"> 
                             <tr style="border-collapse:collapse;"> 
                              <td width="133" align="center" style="padding:0;Margin:0;"> 
                               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                                 <tr style="border-collapse:collapse;"> 
                                  <td align="center" style="padding:0;Margin:0;"> <img class="adapt-img" src="https://gpcmq.stripocdn.email/content/guids/CABINET_e48ed8a1cdc6a86a71047ec89b3eabf6/images/82871534250557673.png" alt="Google Play" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="Google Play" width="133"></td> 
                                 </tr> 
                               </table> </td> 
                             </tr> 
                           </table> 
                           <!--[if mso]></td></tr></table><![endif]--> </td> 
                         </tr> 
                       </table> </td> 
                     </tr> 
                   </table> 
                   <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> 
                     <tr style="border-collapse:collapse;"> 
                      <td style="padding:0;Margin:0;background-color:#253061;" bgcolor="#253061" align="center"> 
                       <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
                         <tr style="border-collapse:collapse;"> 
                          <td align="left" style="padding:0;Margin:0;"> 
                           <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                             <tr style="border-collapse:collapse;"> 
                              <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> 
                               <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#FFF4F7;border-radius:3px;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fff4f7"> 
                                 <tr style="border-collapse:collapse;"> 
                                  <td bgcolor="#FDA203" align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;"> 
                                   <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                                     <tr style="border-collapse:collapse;"> 
                                      <td style="padding:0;Margin:0px;border-bottom:1px solid #FDA203;background:none 0% 0% repeat scroll rgba(0, 0, 0, 0);height:1px;width:100%;margin:0px;"></td> 
                                     </tr> 
                                   </table> </td> 
                                 </tr> 
                               </table> </td> 
                             </tr> 
                           </table> </td> 
                         </tr> 
                       </table> </td> 
                     </tr> 
                   </table> 
                   <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"> 
                     <tr style="border-collapse:collapse;"> 
                      <td style="padding:0;Margin:0;background-color:#253061;" bgcolor="#253061" align="center"> 
                       <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#253061;" width="600" cellspacing="0" cellpadding="0" bgcolor="#253061" align="center"> 
                         <tr style="border-collapse:collapse;"> 
                          <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;"> 
                           <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                             <tr style="border-collapse:collapse;"> 
                              <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> 
                               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                                 <tr style="border-collapse:collapse;"> 
                                  <td esdev-links-color="#999999" align="center" style="padding:0;Margin:0;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;">The content of this email is confidential. It is strictly forbidden to share any part of this message in any form to anyone. If you received this message by mistake, please send a message to emailerror@vistocode.com and follow with its deletion, so that we can ensure such a mistake does not occur in the future.</p> </td> 
                                 </tr> 
                                 <tr style="border-collapse:collapse;"> 
                                  <td esdev-links-color="#999999" align="center" style="padding:0;Margin:0;padding-bottom:5px;"> <p></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;">Copyright © ${copyRightYear} Vistocode App, All rights reserved.<br>A product of Remphil Services, 84 Admiralty Way, Lekki 1, 101001 Lagos, Nigeria.</p> </td> 
                                 </tr> 
                               </table> </td> 
                             </tr> 
                           </table> </td> 
                         </tr> 
                       </table> </td> 
                     </tr>
                   </table> </td> 
                 </tr> 
               </table> 
              </div>  
             </body>
            </html>`,
          }
        
          mailgun.messages().send(emailData, function (error, body) {
            console.log(body)
          });

          return 0;
      })
      .catch(error=>{
        console.log('Error creating user:', error);
    });
    });

    