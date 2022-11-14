import React, {useState} from 'react'

const ErrorContext = React.createContext({

})

export const ErrorContextProvider = (props) => {
    const errorTypes = [
        { errorType : 'DataLoadError', severity: 'critical', errorDesc: 'Error parsing/loading bands data', errorExist: false},
        { errorType : 'APIConnectionError', severity: 'critical', errorDesc: 'Error connecting to the service/API', errorExist: false},
        { errorType : 'NoDataFound', severity: 'error', errorDesc: 'No data found on request', errorExist: false},
    ]
    const [errors, setErrors] = useState(errorTypes)

    const errorHandler = (error) => {
        let errorIndex = errors.findIndex ( x => x.errorType === error.errorType)
        let newErrArray = [...errors]
        newErrArray[errorIndex].errorExist = error.errorExist
        setErrors( newErrArray )
    }

    const contextValue = {
        errors: errors,
        setError: errorHandler
    }

    return (
        <ErrorContext.Provider value={contextValue}>
            {props.children}
        </ErrorContext.Provider>
    )

}

export default ErrorContext;