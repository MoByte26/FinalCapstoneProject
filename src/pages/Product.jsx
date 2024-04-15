import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();
  const product = products.find(product => product.id === parseInt(productId));
  const { name, price } = product;
  return (
    <div>
      <h1>{name}</h1>
      <h2>${price}</h2>
    </div>
  );
}

export default Product;
