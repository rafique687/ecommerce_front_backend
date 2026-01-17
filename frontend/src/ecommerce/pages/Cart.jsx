import { useContext } from "react";
import { CartItem } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";

function Cart() {
  const { cart, increaseQty, decreaseQty,removeItem,clearCart } = useContext(CartItem);

  // 🟢 Calculate Grand Total
  const grandTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-wrapper">
      {cart.length === 0 && <h1 className="empty-cart">🛒 Cart is Empty</h1>}

      {cart.map((item, index) => (
        <div className="cart-item" key={index}>
          {/* Left: Product Info */}
          <div className="cart-left">
            <img src={item.image} alt={item.model} className="cart-img" />
            <div className="cart-details">
              <h2 className="cart-model">{item.model}</h2>
              <p className="cart-price">Price: ₹{item.price}</p>
            </div>
          </div>

          {/* Item total */}
          <div className="cart-left">
            <div className="cart-details">
              <p className="cart-price">
                Total: ₹{item.price * item.quantity}
              </p>
            </div>
          </div>

          {/* Right: Quantity Controls */}
          <div className="cart-right">
            <button
              className="qty-btn"
              onClick={() => decreaseQty(item._id)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="qty">{item.quantity}</span>
            <button className="qty-btn" onClick={() => increaseQty(item._id)}>
              +
            </button>
          <button className="remove-btn" onClick={() => removeItem(item._id)}>
              🗑
            </button>
          </div>
        </div>
      ))}

      {/* 🟢 Grand Total */}
      {cart.length > 0 && (
        <div className="grand-total-right">
          <h2>Grand Total: ₹{grandTotal}</h2>
        </div>
      )}
    </div>
  );
}

export default Cart;
