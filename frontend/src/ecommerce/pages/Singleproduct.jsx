import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartItem } from "../context/CartContext";

function Singleproduct() {
  const { addToCart } = useContext(CartItem);
  const { id } = useParams();
  const [products, setProduct] = useState({});

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  async function fetchData(id) {
    const response = await fetch("http://127.0.0.1:5000/api/displayproducts/" + id);
    const result = await response.json();
    setProduct(result.product);
  }

  return (
    <div className="container my-5">
      <div className="row bg-white shadow rounded p-4">
        {/* Left: Image */}
        <div className="col-md-6 text-center border-end">
          <img
            src={products.image}
            alt={products.productname}
            className="img-fluid rounded"
            style={{ maxHeight: "700px", width: "80%" ,objectFit: "contain" }}
          />
        </div>

        {/* Right: Details */}
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <h2 className="fw-bold">{products.productname}</h2>
            <h5 className="text-muted">{products.Subcategory}</h5>
            <h3 className="text-danger fw-bold mt-3">₹{products.price}</h3>

            <div className="mt-4">
              <h5>Description</h5>
              <p className="text-secondary">{products.description}</p>
            </div>
          </div>

          <button
            className="btn btn-primary btn-lg mt-4"
            onClick={() => addToCart(products)}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Singleproduct;
