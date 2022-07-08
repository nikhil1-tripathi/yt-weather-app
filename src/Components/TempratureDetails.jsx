import { Container } from '@mui/system'
import React from 'react'
import { Box } from '@mui/material';
import "./TempratureDetails.css"
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
  } from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from './DataFetching/FetchData';


function TempratureDetails({weather:{temp, humidity,feels_like,details,icon ,speed,sunrise,timezone,sunset, temp_max,temp_min}, toggle}) {
  return (
    <div>
       <Container>
        <Box sx={{toggle, display: 'flex',  width:530, margin:"auto",justifyContent:"space-evenly", flexDirection:"column"}}>
        <div style={{ fontSize:14,margin:"auto", color:"steelblue", marginTop:10, fontSize:28,fontWeight:500, fontFamily:"sans-serif" }}>{details} </div>
        <div className='box__1'>
          <img className="w-20 inside__box1" src={iconUrlFromCode(icon)}/>
            
          <div className='inside__box2'> {`${temp.toFixed()}°` }</div>
          <div className='inside__box3'>
            <div className='box3__1'>
            <UilTemperature size={18} className="mr-1" />
            <p>Temprature : {`${feels_like.toFixed()}°` }</p>
            </div>
            <div className='box3__1'>
             <UilTear size={18} className="mr-1" />
             <p>Humidity : {`${humidity.toFixed()}%` } </p>
             </div>
             <div className='box3__1'>
               <UilWind size={18} className="mr-1" />
               <p>Wind : {`${speed.toFixed()} km/hr` } </p>
               </div>
         
         
          </div>
        </div>



        


        <div className='box__2'>
            <div className='box__2_1'>
                <UilSun className="logo"/>
                <p>Rise: {formatToLocalTime(sunrise, timezone,"hh:mm a")}</p>
            </div>
            <div className='box__2_1'>
            <UilSunset className="logo"/>
                <p>Set: {formatToLocalTime(sunset, timezone,"hh:mm a")}</p>
            </div> 
            <div className='box__2_1'>
            <UilSun  className="logo"/>
                <p>High: {`${temp_max.toFixed()}°` }</p>
            </div>
            
            <div className='box__2_1'>
            <UilSun className="logo"/> 
                <p  >Low: {`${temp_min.toFixed()}°` }</p>
            </div>
          
        </div>
        </Box>
       </Container>
    </div>
  )
}

export default TempratureDetails
