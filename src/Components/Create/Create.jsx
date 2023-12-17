import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import { AuthContext } from '../../context/Context';
import { firebaseApp } from '../../firebase/firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { getFirestore, getDocs, collection, addDoc, deleteDoc,doc} from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [featured, setFeatured] = useState(false)
  // const [imageUrl, setImageUrl] = useState(null)
  const date = new Date();

  const {user} = useContext(AuthContext);
  const storage = getStorage(firebaseApp);
  const firestoreBase = getFirestore(firebaseApp);
  const navigateTo = useNavigate() 

  const handleSubmit = (e) => {
    e.preventDefault();
    const postImagesRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(postImagesRef, image);
    uploadTask.on('state_changed',
      (snapshot) => { console.log(snapshot)
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        
        try {
          addDoc(collection(firestoreBase,"products"),{
            name,
            category,
            price,
            imageUrl:downloadURL,
            userId:user.uid,
            createdAt:date.toDateString(),
            featured:featured
          })
          navigateTo("/")
        } catch (error) {
          console.log(error)
        }

      });
    }
  );






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
            <br />
            <span className='featureCheck'>
              <input 
                className="input"
                type="checkbox"
                id="featured"
                name="featured"
                placeholder='category'
                value={featured}
                onChange={(e) => setFeatured(e.target.checked)}          
              />
              <label htmlFor="featured">Featured</label>
            </span>
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>

        </div>

    </Fragment>
  );
};

export default Create;
