import React, { useContext, useEffect, useState } from 'react';
import './Post.css';
import { PostContext } from '../../context/PostContext';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from "react-router-dom";
import PostCards from './PostCards';
import { getAllPosts } from './apis';
import { getFavourited } from './apis';
import { AuthContext } from '../../context/Context';


function Posts() {
  const [products, setProducts] = useState([])
  const [isFavourited, setIsFavourited] = useState([])
  const {searchKey, setSearchKey} = useContext(SearchContext);
  const [visiblePosts, setVisiblePosts] = useState(30);
  const navigateTo = useNavigate();

  useEffect(() => {
    getFavourited(setIsFavourited)
  }, [])
  
  useEffect(() => {
    getAllPosts(setProducts, searchKey, visiblePosts);
  }, [searchKey, visiblePosts])


  const loadMore = () => {setVisiblePosts(prev => prev+20)}

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        {searchKey && <div>{`showing results for '${searchKey}' `}</div>} <br />
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        {products.length > 0 ?
        <PostCards products={products} isFavourited={isFavourited} setIsFavourited={setIsFavourited} /> :
        <div>No products found</div> }
      </div>
      {products.length > 20 &&
        <div className='loadBtnDiv'>
          <button onClick={loadMore}>Load More</button>
        </div>
      }
    </div>
  );
}

export default Posts;
