import React, { useContext} from 'react'
import './Post.css';
import Featured from '../../assets/Featured';
import Heart from '../../assets/Heart';
import { useNavigate } from "react-router-dom";
import { PostContext } from '../../context/PostContext';

function PostCards({products}) {
    const {setPostDetails}  = useContext(PostContext);
    const navigateTo = useNavigate();

  return (
    <div className="cards">
    {products.map(product => {
      return (
        <div
          className="card"
          onClick={() => {
            setPostDetails(product)
            navigateTo("/view")
          }}
        >
          <div className="favorite">
          {product.featured ? <Featured style={{ alignSelf: 'flex-start' }}></Featured> : <div></div>}
            <Heart style={{ alignSelf: 'flex-end' }}></Heart>
          </div>
          <div className="image">
            <img src={product.imageUrl} alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {product.price}</p>
            <span className="kilometer">{product.category}</span>
            <p className="name"> {product.name}</p>
          </div>
          <div className="date">
            <span>{product.createdAt}</span>
          </div>
        </div>
      )
    })}
  </div>
  )
}

export default PostCards
