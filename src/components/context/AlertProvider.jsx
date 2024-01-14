import React, { createContext, useState } from 'react'

const AlertContext = createContext({})

export const AlertProvider = ({ children }) => {
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)

    return (
        <AlertContext.Provider value={{ success, setSuccess, failed, setFailed }}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertContext;
