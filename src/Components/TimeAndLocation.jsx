import { Container, Box } from '@mui/system'
import React from 'react'
import { formatToLocalTime } from './DataFetching/FetchData'

const TimeAndLocation = ({ weather: { dt, timezone, name, country } }, toggle) => {
  return (
    <div>
        <Container>
            
            <Box  sx={{toggle, display: 'flex',  width:530, margin:"auto",justifyContent:"space-evenly", flexDirection:"column"}} >
              <div  style={{ fontSize:14,margin:"auto", color:"white", marginTop:10, fontSize:14,toggle, fontFamily:"sans-serif" }}><i>{formatToLocalTime(dt,timezone)}</i> </div> 
               <div style={{ fontSize:14,margin:"auto", color:"white", marginTop:10, fontSize:16, }}><i>{name},{country}</i></div> 
            </Box>
        </Container>
      
    </div>
  )
}

export default TimeAndLocation
