import { firebaseApp } from "../../firebase/firebaseConfig";
import { query, collection, getDocs, getFirestore, where, orderBy, limit } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const productRef = collection(db, "products");

export const getAllPosts = async (setProducts, searchKey) => {
  try {

    const posts = query(collection(db, "products"), orderBy("createdAt","desc"),limit(30));
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
