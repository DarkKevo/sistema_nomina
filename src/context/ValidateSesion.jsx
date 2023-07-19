import { createContext, useState } from 'react';
export const sesion = createContext()

export default function ValidateSesion({children}){

    const [token, setToken] = useState('0');

    return(
        <sesion.Provider value={{token, setToken}}>
            {children}
        </sesion.Provider>
    )
}