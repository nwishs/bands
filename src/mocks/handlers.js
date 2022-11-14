import { rest } from 'msw';
import { mockData } from './bandMockData'

export const handlers = [
    //rest.get(`${process.env.REACT_APP_BANDS_API_URL}/festivals`, (req, res, ctx) => {
    rest.get('*/festivals', (req, res, ctx) => {    
        return res( ctx.json( mockData ) )
    })
]