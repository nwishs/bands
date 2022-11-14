import './App.css';
import ErrorContext from './context/errorContext';
import { useContext } from 'react';
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';
import { Box } from '@mui/material'

function Errors() {
  const errorContext = useContext(ErrorContext)

  return (
    <Box  style={{padding:'2ch'}}>
        {
            errorContext.errors.filter(x=>x.errorExist === true).length > 0 &&
            <Divider>            
                <Typography variant='h5'>
                    Errors
                </Typography>
            </Divider>
        }
        {
            errorContext.errors.filter(x=> x.errorExist === true).map((y,i) => {
                return <Typography key={i} variant='h5'>{y.errorDesc}</Typography>
            })
        }      
    </Box>
  );
}

export default Errors;
