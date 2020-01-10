import React from 'react';

const authTypeContext = React.createContext({
    authTypeIsLogin: true,
    changeAuthType: ()=>{}
});

export default authTypeContext;