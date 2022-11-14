import './App.css';
import Bands from './feature/bands';
import Errors from './errors'
import { Divider } from '@mui/material';
import { Typography } from '@mui/material';
import { margin } from '@mui/system';

function App() {

  return (
    <div>
      <Divider>            
        <Typography variant='h5' sx={{margin:'3ch'}}>
          Record Labels
        </Typography>
      </Divider>
      <Bands />
      <Errors />
    </div>
  );
}

export default App;
