import React from 'react';

const userDataContext = React.createContext({
    authenticated: false,
    appData:'',
    changeAuthenticated: ()=>{}
});

export default userDataContext;