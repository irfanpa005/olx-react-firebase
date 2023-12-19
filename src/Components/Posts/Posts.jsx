import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseApp } from '../../firebase/firebaseConfig';
import { PostContext } from '../../context/PostContext';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from "react-router-dom";
import Featured from '../../assets/Featured';

function Posts() {
  const db = getFirestore(firebaseApp);
  const [products, setProducts] = useState([])
  const {setPostDetails}  = useContext(PostContext);
  const {searchKey, setSearchKey} = useContext(SearchContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    const productRef = collection(db, "products");
    getDocs(productRef).then((snapshot) => {
         const allProducts =  snapshot.docs.map((product) => {
              return {
                ...product.data(),
                id:product.id
              }
            })
          setProducts(allProducts);
    })
  }, [])
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          {searchKey}
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
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
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
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
                  <Heart style={{ alignSelf: 'flex-end' , right:0}}></Heart>
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
      </div>
    </div>
  );
}

export default Posts;
