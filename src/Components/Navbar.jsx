import React from 'react';
import { Box,TextField, Button, Container } from '@mui/material';
import { margin, width } from '@mui/system';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const data = [
    {
      city: "ROME",
      id:1
    },
    {
      city:  "TOKYO" ,
      id: 2
    },
    {
        city:  "LONDON" ,
        id: 3
    },
    {
       city: "DELHI",
       id: 4
    },
    {
        city: "PARIS",
        id: 5
     }
]

 const Navbar = ({setQuery, toggle}) => {
  return (
        <div >
          <Container>
          <Box
       sx={{toggle, display: 'flex', width:530, margin:"auto",justifyContent:"space-evenly"}} >
        {data.map((e) => (
        <Button 
        onClick={() => setQuery({ q: e.city })}
        sx={{marginTop:2}} key={e.id}><b>{e.city}</b></Button>
        ))}
          </Box>
          
          </Container>
       


          {/* {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))} */}
        </div>
      
       
            
           
          
   
  )
}

export default Navbar
