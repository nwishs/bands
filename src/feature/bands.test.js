import { redner, render, screen } from '@testing-library/react'
import { APIContextProvider } from '../context/apiContext';
import { ErrorContextProvider } from '../context/errorContext'; 
import Bands from './bands'

const EAProviders = ({children}) => {
    return (
      <ErrorContextProvider>
          {children}
      </ErrorContextProvider>
    )
  }


test(' transform data from mock server and display record labels in sorted order', async () => {

    render( <Bands/>, { wrapper : EAProviders } )

    await screen.findAllByText('Fourth Woman Records')
    await screen.findAllByText('Outerscope')
    await screen.findAllByText('Marner Sis. Recording')
    await screen.findAllByText('MEDIOCRE Music')
    await screen.findAllByText('Pacific Records')
    
    await screen.findAllByRole('treeitem')
    expect(screen.getAllByRole('treeitem').length).toBe(7)

})