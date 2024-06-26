import React, { createContext, useState } from 'react'

const LoadingContext = createContext({})

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, isSuccess, setIsSuccess }}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext;
