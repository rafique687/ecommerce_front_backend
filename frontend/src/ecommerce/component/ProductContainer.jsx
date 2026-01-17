import { Link } from "react-router-dom";
import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { CartItem } from "../context/CartContext";
import { WishlistItems } from "../context/WhishlistItems";

function ProductContainer({ product }) {
  const { addToCart } = useContext(CartItem);

  // ✅ FIX: Get removeFromWishlist from context, NOT 0
  const { addToWhishlist, removeFromWishlist, whishlistprod } =
    useContext(WishlistItems);

  function trimContent(input) {
    if (!input) return "";
    const words = input.split(" ");
    return words.length > 8
      ? words.slice(0, 7).join(" ") + "..."
      : input;
  }

  const isWished =
    whishlistprod?.some((item) => item._id === product._id);

  return (
    <div className="product" style={{ marginTop: "10px" }}>
      <Link to={`singleproduct/${product._id}`}>
        <img
          src={product.image}
          alt="Product Image"
          style={{ width: "100%", height: "60%" }}
        />
      </Link>

      <div className="content">
        <h3>{trimContent(product.productname)}</h3>
      </div>

      <button
        className="custom-button btn btn-info"
        onClick={() => addToCart(product)}
      >
        Add To Cart
      </button>

      {/* ⭐ Wishlist Button */}
      <button
        className="btn ms-auto"
        onClick={() =>
          isWished
            ? removeFromWishlist(product._id)
            : addToWhishlist(product)
        }
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
          color: isWished ? "red" : "gray",
        }}
      >
        {isWished ? <FaHeart /> : <FaRegHeart />}
      </button>

      <p>{trimContent(product.description)}</p>
    </div>
  );
}

export default ProductContainer;
