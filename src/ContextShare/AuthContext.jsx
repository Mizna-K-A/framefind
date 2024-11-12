// import React, { createContext, useEffect, useState } from 'react'
// export const tokenAuthContext = createContext()

// const AuthContext = ({children}) => {
//     const [isAuthorised,setIsAuthorised] = useState(false)

//     useEffect(()=>{
//         if (sessionStorage.getItem("token")) {
//             setIsAuthorised(true)
//         }else{
//             setIsAuthorised(false)
//         }
//     },[isAuthorised])

//   return (
//     <tokenAuthContext.Provider value={{isAuthorised,setIsAuthorised}}>
//         {children}
//     </tokenAuthContext.Provider>
//   )
// }

// export default AuthContext

import React, { createContext, useEffect, useState } from 'react';
export const tokenAuthContext = createContext();

const AuthContext = ({children}) => {
    const [isAuthorised, setIsAuthorised] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsAuthorised(true);
        } else {
            setIsAuthorised(false);
        }
    }, []); // Only run on initial render

    return (
        <tokenAuthContext.Provider value={{ isAuthorised, setIsAuthorised }}>
            {children}
        </tokenAuthContext.Provider>
    );
};

export default AuthContext;
