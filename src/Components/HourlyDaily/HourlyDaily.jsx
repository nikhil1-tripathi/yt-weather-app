import React from 'react'
import "./HourlyDaily.css";
import { Box, Container } from '@mui/material';
import { iconUrlFromCode } from './../DataFetching/FetchData';

function HourlyDaily({title, items, toggle}) {
 
  
  return (
    <div >
       <Container>
            <Box  sx={{toggle, display: 'flex',  width:530, margin:"auto",justifyContent:"space-evenly", flexDirection:"column"}} >
            <p className='HD'>{title}</p> 
                




            <div className='HD__box_1'>
                {items.map((item, index) => (
         
                <div key={index} className='HD__box_1_1'>
                <p>{(item.title)}</p>
                   <img className="w-20 img" src={iconUrlFromCode(item.icon)}/>
                  <p>{`${item.temp.toFixed()}°`}</p>
                </div>
                
        ))}
        </div>

               
              
            </Box>
        </Container>
    </div>
  )
}

export default HourlyDaily
