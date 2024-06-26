import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [filterText, setFilterText] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  
  

  useEffect (() => {
    async function getProducts () {
        try {
            const response = await fetch ('http://localhost:3000/api/purses');
            const data = await response.json();
            setProducts(data);
          } catch (error) {
            console.error(error);
          }
        }
        getProducts() 
        console.log(products)
}, [])

return (<div className="allProduct">
  { products.map(product => {
    return ( 
      <section className="productCard" key={product.id}>
        <h2>{product.name}</h2>
        <img src={product.img_url}/>
        <button
        onClick={() => {
          navigate(`/${product.id}`);
        }}
      >
        See Details
      </button>
      </section>

    )
  })}
</div>)
};

// const filteredProducts = products.filter(product => product.name.toLowerCase().includes(filterText.toLowerCase()));
    

export default Products;


//   return (
//     <div>
//       <h1>Products</h1>
//       <input value={filterText} onChange={(e) => setFilterText(e.target.value)} type="text"/>
      
//     </div>

//   )
// }


{/* <section>
        <h2>${products.title}</h2>
        <img src="${product.image}" />
        <p>${products.description}</p>
      </section> */}


{/* <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul> */}

    //   function render(products) {
    //     const template = products.map(products => {
    //         return (
    //             <li>
    //                 <h2>${products.title}</h2>
    //             </li>
    //         )
    //     })