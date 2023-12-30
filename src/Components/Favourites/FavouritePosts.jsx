import React, { useState, useContext, useEffect } from 'react'
import './FavouritePosts.css'
import { getAllPosts } from '../Posts/apis'
import { getFavourited } from '../Posts/apis'
import PostCards from '../Posts/PostCards'

function FavouritePosts() {
  const [products, setProducts] = useState([])
  const [isFavourited, setIsFavourited] = useState([])
  const [favoritedPosts, setFavoritedPosts] = useState([]);

  useEffect(() => {
    getAllPosts(setProducts, null);
  }, [])

  useEffect(() => {
    getFavourited(setIsFavourited)
  }, [])

  useEffect(() => {
    const favorited = products.filter((product) =>
      isFavourited.includes(product.id)
    );
    setFavoritedPosts(favorited);
  }, [isFavourited, products]);
    return (
      <div className="postParentDiv">
        <div className="favouritePosts">
          <div className="heading">
            <span>My ADS</span>
          </div>
          {products.length > 0 ?
          <PostCards products={favoritedPosts} isFavourited={isFavourited} setIsFavourited={setIsFavourited} /> :
          <div>No products found</div> }
        </div>
      </div>
    );
}

export default FavouritePosts
