import React, { useContext, useState } from "react";
import "./Post.css";
import Featured from "../../assets/Featured";
import Heart from "../../assets/Heart";
import HeartFilled from "../../assets/HeartFilled";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../context/PostContext";
import { setFavourited } from "./apis";

function PostCards({products, isFavourited, setIsFavourited }) {
  const { setPostDetails } = useContext(PostContext);
  const navigateTo = useNavigate();

  const handleFavourite = (productId) => {
    setFavourited(productId);
    if (isFavourited.includes(productId)) {
      setIsFavourited ((isFavourited) => isFavourited.filter((id) => id !== productId ));
    } else {
      setIsFavourited ([...isFavourited, productId]);
    }
  };

  return (
    <div className="row">
      {products.map((product) => {
        return (
          <React.Fragment key={product.id}>
          <div
            className="col-md-3 col-sm-6 col-12 cardParent">
            <div className="card"  onClick={() => {
              setPostDetails(product);
              navigateTo("/view");
            }}>
              {product.featured && 
                <div className="featured">
                  <Featured></Featured>
                </div>
              }
              <div className="image">
                <img src={product.imageUrl} alt="" />
              </div>
              <div className="content">
                <span className="rate">&#x20B9; {product.price}</span>
                <p className="name"> {product.name}</p>
                <p className="category">{product.category}</p> 
              </div>
              <div className="date">
                <span className="location">{product.location}</span>
                <span>{product.createdAt}</span>
              </div>
            </div>
            <div className="heartIcon" onClick={() => {handleFavourite(product.id)}}>
              {isFavourited.includes(product.id) ? <HeartFilled /> : <Heart />}
            </div>
          </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default PostCards;
