import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Header from '../components/Header'
import Slider from '../components/Slider'
import FlavourWeek from '../components/FlavourWeek'
import Main from '../components/Main'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
      <Announcement/>
      <Navbar/>
      <Header/>  
      <Slider/>
      <FlavourWeek/>
      <Main/> 
      <Footer/>
    </div>
  )
}

export default Home

