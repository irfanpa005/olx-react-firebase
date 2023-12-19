import React from 'react';
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';
import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import { SearchFunction } from '../context/SearchContext';


function Home(props) {
  return (
    <div className="homeParentDiv">
      <SearchFunction>


      <Header />
      <Banner />
      <Posts />
      <Footer />
      </SearchFunction>
    </div>
  );
}

export default Home;
 
