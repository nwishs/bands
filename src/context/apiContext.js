import axios from 'axios';
import React from 'react';

const header = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
}

const APIContext = React.createContext({
    fetchBands : () => { }
})

export const APIContextProvider = (props) => {

    const getRequest = async (url) => {
        try {
            let response = await axios.get( url, { headers:header } )    
            console.log(response)
            return { status: 'SUCCESS', data: response.data}
        }
        catch(error) {
            return {status: 'FAILURE'}
        }
    }

    const fetchBands = () => {
        return getRequest(`${process.env.REACT_APP_BANDS_API_URL}/festivals`)
    }

    const contextValue = {
        fetchBands : fetchBands
    }

    return (
        <APIContext.Provider value={contextValue}>
            {props.children}
        </APIContext.Provider>
    )
}

export default APIContext