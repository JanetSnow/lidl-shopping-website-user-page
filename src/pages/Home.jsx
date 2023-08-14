import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Header from '../components/Header'
import Slider from '../components/Slider'
import FlavourWeek from '../components/FlavourWeek'
import Main from '../components/Main'
import Footer from '../components/Footer'
import Grocery from '../components/Grocery'

const Home = () => {
  return (
    <div>
      <Announcement/>
      <Navbar/>
      <Grocery/>
      <Header/>  
      <Slider/>
      <FlavourWeek/>
      <Main/> 
      <Footer/>
    </div>
  )
}

export default Home

