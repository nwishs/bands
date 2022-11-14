import React, { useState, useContext, useEffect } from 'react'
import APIContext from '../context/apiContext'
import ErrorContext from '../context/errorContext'
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';


const header = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
}

const Bands = () => {
    const [transformedData, setTransformedData] = useState([])
    const [flattenData, setFlattenData] = useState([])
    const [reload, setReload] = useState(false)
    const apiContext = useContext(APIContext)
    const errorContext = useContext(ErrorContext)

    useEffect(() => {
        //apiContext.fetchBands().then(response => {
        axios.get( `${process.env.REACT_APP_BANDS_API_URL}/festivals`, { headers:header } ).then(response => {
            console.log(response)
            if (response.status === 200) {
                let flatData = []
                if(response.data) {
                    response.data.forEach(x => {
                        x.bands.forEach(y => {
                            flatData.push({ bandName: y.name ? y.name : 'NO_BRAND', recordLabel: y.recordLabel ? y.recordLabel : 'NO_LABEL', festival: x.name ? x.name : 'NO_FESTIVAL_NAME' })
                        })
                    })
                    errorContext.setError({ errorType: 'NoDataFound', errorExist: false })        
                }
                else
                    errorContext.setError({ errorType: 'NoDataFound', errorExist: true })      
                setFlattenData(flatData)
                errorContext.setError({ errorType: 'APIConnectionError', errorExist: false })
            } else {
                errorContext.setError({ errorType: 'APIConnectionError', errorExist: true })
            }
        })
    }, [reload])

    const sortTransformedData = (transformedData) => {
        transformedData.sort( (a,b) =>  {
            if (a.recordLabel?.toUpperCase() < b.recordLabel?.toUpperCase()) return -1
            else return 1;
        })

        transformedData.forEach( x => {
            x.bands.sort((a, b) => {
                if(a.bandName.toUpperCase() < b.bandName.toUpperCase()) return -1 
                else return 1
            })
            x.bands.forEach( y => {
                y.festivals.sort((a,b) => {
                    if(a.festival.toUpperCase() < b.festival.toUpperCase()) return -1 
                    else return 1
                })
            })
        })
    }

    const groupByRecordLabel = () => {
        return flattenData.reduce(function (a, c) {
            let index = a.findIndex(x => x.recordLabel === c.recordLabel)
            if (index > -1)
                a[index].bands.push({ bandName: c.bandName, festival: c.festival });
            else {
                a.push({ recordLabel: c.recordLabel, bands: [{ bandName: c.bandName, festival: c.festival }] })
            }
            return a;
        }, []);
    }

    const groupByBands = (recordLabelGroup) => {
        return recordLabelGroup.map(x => {
            return {
                recordLabel: x.recordLabel,
                bands: x.bands.reduce(
                    function (a, c) {
                        let index = a.findIndex(x => x.bandName === c.bandName)
                        if (index > -1)
                            a[index].festivals.push({ festival: c.festival });
                        else {
                            a.push({ bandName: c.bandName, festivals: [{ festival: c.festival }] })
                        }
                        return a;
                    }, []
                )
            }
        })
    }

    useEffect(() => {
        let recordLabelGroup = groupByRecordLabel()
        let transformedData = groupByBands(recordLabelGroup)
        sortTransformedData(transformedData)
        setTransformedData(transformedData)
    }, [flattenData])

    return (
        <>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    id={'bands-tree-view'}
                    sx={{ flexGrow: 1, overflowY: 'auto', padding:'2ch' }}
                >
                    {
                        transformedData.map((x,i) =>
                            <TreeItem id={`${x.recordLabel}-${i}`} key={`${x.recordLabel}-${i}`} nodeId={`${x.recordLabel}-${i}`} label={x.recordLabel} >
                                {
                                    x.bands.map((y,j) =>
                                        <TreeItem id={`${y.bandName}-${j}`} key={`${y.bandName}-${j}`} nodeId={`${y.bandName}-${j}`} label={y.bandName} >
                                            {
                                                y.festivals.map((z,k) => <TreeItem id={`${z.festival}-${k}`} key={`${z.festival}-${k}`} nodeId={`${z.festival}-${k}`} label={z.festival} /> )
                                            }
                                        </TreeItem>
                                    )
                                }
                            </TreeItem>
                        )
                    }
                </TreeView>
                <Grid container   direction="row"  justifyContent="center"  alignItems="center" >
                    <Button variant="outlined" onClick={()=>setReload(!reload)}>Reload festival data</Button>
                </Grid>
        </>
    )
}

export default Bands