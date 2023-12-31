import { firebaseApp } from "../../firebase/firebaseConfig";
import { query, collection, getDocs, getFirestore, orderBy, limit, where, updateDoc, doc, getDoc  } from "firebase/firestore";


const db = getFirestore(firebaseApp);
const productRef = collection(db, "products");
const userRef = collection(db, "users");

export const getAllPosts = async (setProducts, searchKey, visiblePosts) => {
  try {
    const posts = query(collection(db, "products"), orderBy("createdAt","desc"), limit(visiblePosts));
    const snapshot = await getDocs(posts);
    let allProducts = snapshot.docs.map((product) => ({
      ...product.data(),
      id: product.id
    }));

    if (searchKey) {
      const normalizedSearchKey = searchKey.toLowerCase();
      const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(normalizedSearchKey)
      );
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts);
    }
  } catch (error) {
    console.error("Error fetching searched posts: ", error);
  }
};


export const getFavourited = async (setIsFavourited) => {
  let userId = localStorage.getItem("userInfo")
  try {
    const querySnapshot = await getDocs(query(userRef, where("id", "==", userId)));
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      const currentFavorites = userData.favourited || [];
      setIsFavourited(currentFavorites) 
    } else {
      console.log("User document does not exist.");
    }
  } catch (error) {
    console.log(error);
  }
}

export const setFavourited = async (productId) => {
  let userId = localStorage.getItem("userInfo")
  try {
    const querySnapshot = await getDocs(query(userRef, where("id", "==", userId)));
    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]; 
        const userDataRef = doc.ref;
        const currentFavorites = doc.data().favourited || [];
      
      if (!currentFavorites.includes(productId)) {
        const updatedFavorites = [...currentFavorites, productId];
        await updateDoc(userDataRef, { favourited: updatedFavorites });
      } else {
        const updatedFavorites = currentFavorites.filter((id) => id !== productId);
        await updateDoc(userDataRef, { favourited: updatedFavorites });
      }
    } else {
      console.log("User document does not exist.");
    }
  } catch (error) {
    console.log(error);
  }
}
