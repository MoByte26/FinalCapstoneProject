import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState();
  const { productId } = useParams();
  const navigate = useNavigate();


  useEffect (() => {
    console.log("hello", productId)
    async function getProduct () {
        try {
            const response = await fetch (`http://localhost:3000/api/purses/${productId}`);
            const data = await response.json();
            setProduct(data);
          } catch (error) {
            console.error(error);
          }
        }
        getProduct() 
}, [productId])

  return (
    <div className="productCardSingle">
      <h1 className="productWordsTop">{product?.name}</h1>
      <img src={product?.img_url}/>
      <p className="productWordsBottom">{product?.description}</p>
      <button onClick={() => {navigate(`/Cart`); }}>Add to cart</button>
    </div>
  );
}

export default Product;

