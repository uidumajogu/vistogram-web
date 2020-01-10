
import Firebase from '../firebase/Config';


    let userData = null;
    let businessCategories = [{id: 'SLCT', label: 'None', identifier: 'NA'},];
    let defaultParameters = '';
    let defaultLogo = '';
    let defaultHomeBkgImage = '';
    let defaultAdvert = '';
    let purposeOfVisitOptions = '';



export const AppData = data => {
    userData = null;
    businessCategories = [{id: 'SLCT', label: 'None', identifier: 'NA'},];
    defaultParameters = '';
    defaultLogo = '';
    defaultHomeBkgImage = '';
    defaultAdvert = '';
    purposeOfVisitOptions = '';

    Firebase.auth().onAuthStateChanged(user => {
        if (user) {
  
          const db = Firebase.firestore();
          const userDataRef = db.collection("users").doc(user.uid);
          const defaultLogoRef = db.collection("defaultParameters").doc('logoImage');
          const defaultHomeBkgImageRef = db.collection("defaultParameters").doc('backgroundImage');
          const defaultAdvertRef = db.collection("defaultParameters").doc('advertImage');
          const businessCategoryDataRef = db.collection("businessCategories");
          const defaultParametersDataRef = db.collection("defaultParameters").doc("defaultParameters");
          const purposeOfVisitOptionsRef = db.collection("defaultParameters").doc("purposeOfVisitOptions");
  
          userDataRef.get().then((doc) => {
              if (doc.exists) {
                userData = doc.data();
  
                defaultLogoRef.get().then(doc=>{
                  defaultLogo=doc.data();
                });
  
                defaultHomeBkgImageRef.get().then(doc=>{
                  defaultHomeBkgImage=doc.data();
                });
  
                defaultAdvertRef.get().then(doc=>{
                  defaultAdvert=doc.data();
                });
  
                purposeOfVisitOptionsRef.get().then(doc=>{
                  purposeOfVisitOptions=doc.data();
                });
  
                businessCategoryDataRef.get()
                .then((querySnapshot)=> {
                    querySnapshot.forEach((doc)=> {   
                        businessCategories.push(doc.data()); 
                    });
  
                    defaultParametersDataRef.get().then((doc) => {
                      if (doc.exists) {
                          defaultParameters = doc.data();

                          return {
                            appData: true,
                            userData:userData,
                            businessCategories:businessCategories,
                            defaultParameters:defaultParameters,
                            defaultLogo:defaultLogo,
                            defaultHomeBkgImage:defaultHomeBkgImage,
                            defaultAdvert:defaultAdvert,
                            purposeOfVisitOptions:purposeOfVisitOptions,
                          };
  
                      } else {
                          return {
                            appData: false,
                            error: 'could not fetch data',
                            };
                      }
                  })
                  .catch((error)=> {
                    return {
                        appData: false,
                        error: error,
                        };
                  });
                })
                .catch((error)=> {
                    return {
                        appData: false,
                        error: error,
                        };
                });
  
              } else {
                return {
                    appData: false,
                    error: 'could not fetch data',
                    };
              }
              
          })
          .catch((error)=> {
            return {
                appData: false,
                error: error,
                };
          });
  
        } else {
            return {
                appData: false,
                error: 'could not fetch data',
                };
        }
      });
    }