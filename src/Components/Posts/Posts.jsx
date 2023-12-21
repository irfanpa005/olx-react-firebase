import React, { useContext, useEffect, useState } from 'react';
import './Post.css';
import { PostContext } from '../../context/PostContext';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from "react-router-dom";
import PostCards from './PostCards';
import { getAllPosts } from './apis';


function Posts() {
  const [products, setProducts] = useState([])
  const {setPostDetails}  = useContext(PostContext);
  const {searchKey, setSearchKey} = useContext(SearchContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    getAllPosts(setProducts, searchKey);
  }, [searchKey])
  

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        {searchKey && <div>{`showing results for '${searchKey}' `}</div>} <br />
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        {products.length > 0 ?
        <PostCards products={products} /> :
        <div>No products found</div> }
      </div>
      <div className='loadBtnDiv'>
        <button mx-auto>Load More</button>
      </div>
    </div>
  );
}

export default Posts;
