import { useEffect, useState } from "react";
import ProductContainer from "./ProductContainer";

function Product() {
  const [products, setproduct] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

 // console.log();



  async function fetchData() {
    const response = await fetch("http://127.0.0.1:5000/api/displayproducts");
    const result = await response.json();
    console.log(result);
    setproduct(result);
  }
 // console.log(products);
  return (
    <section className="product-wrapper">
      {products.map((obj) => {
        return <ProductContainer key={obj._id} product={obj} />;
      })}
    </section>
  );
}
export default Product;
