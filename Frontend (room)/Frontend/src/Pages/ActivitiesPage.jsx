import React from 'react'
import Activities from '../Components/Activities'
import Navbar from '../Components/Navbar'
import DreamVacation from '../Components/Home/DreamVacation'
import Restrictions from '../Components/Restrictions'
import Footer from '../Components/Footer'
import { Box } from '@mui/material'


const ActivitiesPage = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{ bgcolor: "rgba(242, 242, 242, 1)" }}>
        <Activities />
        <Box sx={{mt:"0px"}}>
          <DreamVacation />
          <Restrictions />
          <Box sx={{ mt: "30px" }}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ActivitiesPage
