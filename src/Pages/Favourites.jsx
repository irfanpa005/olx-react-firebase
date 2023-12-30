import React from 'react'
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';
import FavouritePosts from '../Components/Favourites/FavouritePosts';
import Footer from '../Components/Footer/Footer';

function Favourites() {
  return (
    <div>
        <Header />
        <Banner />
        <FavouritePosts />
        <Footer />
    </div>
  )
}

export default Favourites
