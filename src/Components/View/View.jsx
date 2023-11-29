import React, { useContext, useEffect, useState } from 'react';
import { firebaseApp } from '../../firebase/firebaseConfig';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import './View.css';
import { PostContext } from '../../context/PostContext';

function View() {
  const [userDetails, setUserDetails] = useState();
  const {postDetails, setPostDetails} = useContext(PostContext);
  const app = useContext(firebaseApp)
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { userId } = postDetails;
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('id', '==', userId));
        const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchUserData();
  }, [])
  

  return (
    <div className="viewParentDiv">
      {postDetails && 
        <div className="imageShowDiv">
          <img
            src={postDetails.imageUrl}
            alt=""
          />
        </div>
      }
      <div className="rightSection">
        {postDetails && 
          <div className="productDetails">
            <p>&#x20B9; {postDetails.price} </p>
            <span>{postDetails.name}</span>
            <p>{postDetails.category}</p>
            <span>{postDetails.createdAt}</span>
          </div>
        }
        { userDetails && 
          <div className="contactDetails">
            <p>{userDetails.username}</p>
            <p>No name</p>
            <p>{userDetails.phoneNo}</p>
          </div>
        }
      </div>
    </div>
  );
}
export default View;
