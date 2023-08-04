import { createContext, useState } from 'react';
export const sesion = createContext()

export default function ValidateSesion({children}){

    const [token, setToken] = useState(()=>{
        const storageToken = window.localStorage.getItem('token')
        if (storageToken) return storageToken;
        return '0';
    });

    const [loader, setLoader] = useState(false)

    return(
        <sesion.Provider value={{token, setToken, setLoader, loader}}>
            {children}
        </sesion.Provider>
    )
}