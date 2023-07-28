import { createContext, useState } from 'react';
export const sesion = createContext()

export default function ValidateSesion({children}){

    const [token, setToken] = useState(()=>{
        const storageToken = window.localStorage.getItem('token')
        if (storageToken) return storageToken;
        return '0';
    });

    return(
        <sesion.Provider value={{token, setToken}}>
            {children}
        </sesion.Provider>
    )
}