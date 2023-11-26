import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { auth } from '../../firebase/firebaseConfig';
import { AuthContext } from '../../context/Context';

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)

  const {user} = useContext(AuthContext); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user)
  }

  return (
    <Fragment>
        <div className="centerDiv">
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="Name"
              placeholder='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              placeholder='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}

            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input className="input" type="number" id="price" name="Price"
              value={price}  
              onChange={(e) => setPrice(e.target.value)} />
            <br />
          <br />
          { image && <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : " " }></img> }
            <br />
            <input type="file" onChange={(e) => {setImage(e.target.files[0])}}/>
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
        </div>

    </Fragment>
  );
};

export default Create;
