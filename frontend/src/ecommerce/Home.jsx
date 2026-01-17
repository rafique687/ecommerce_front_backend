import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { CartItem } from "../ecommerce/context/CartContext.jsx";
// import { WishlistItems } from "./context/WishlistItems.jsx";
import { WishlistItems } from "../ecommerce/context/WhishlistItems.jsx";

import "./ecommerce.css";
import "./cart.css";
import "./nav.css";

function Home() { 
  const [cart, setCart] = useState(
    localStorage.getItem("CartItems")
      ? JSON.parse(localStorage.getItem("CartItems"))
      : []
  );

  //const [whishlistprod, setWhishlist] = useState([]);
  const [whishlistprod, setWhishlist] = useState(
                                          localStorage.getItem('whishItem')
                                          ? JSON.parse(localStorage.getItem("whishItem"))
                                          :[]
                                        );

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("CartItems", JSON.stringify(cart));
    }
  }, [cart]);
  useEffect( ()=>{
    if(whishlistprod.length > 0)
      {
          localStorage.setItem("whishItem", JSON.stringify(whishlistprod));
     }
  }, [whishlistprod])


   function addToWhishlist(productToWhishlist) {
    setWhishlist([...whishlistprod, productToWhishlist]);
  }
  function removeWish()
  {
   localStorage.removeItem("whishItem"); // clear from localStorage
  setWhishlist([]);
  }

  function addToCart(idToAdd) {
  
  const productExists = cart.find(item => item._id === idToAdd._id);

  if (productExists) {
    // If product already in cart → increase quantity
       const updatedCart = cart.map(item =>
      item._id === idToAdd._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  } else {
         setCart([...cart, { ...idToAdd, quantity: 1 }]);
      console.log(cart)
    }
}

function increaseQty(id)
{
  const increaseQty = cart.map( item => item._id===id ? {...item,quantity:item.quantity + 1 }:item);
  setCart(increaseQty);

}

function decreaseQty(id)
{
  const descreaseQty= cart.map(item => item._id === id ? {...item,quantity:item.quantity - 1}:item);
  setCart(descreaseQty);
}



  function clearCart() {
     localStorage.removeItem("CartItem"); // clear from localStorage
  setCart([]);                      // clear React state

}

function removeItem(id)
{
  const afterRemove = cart.filter((item)=> item._id!==id);
  console.log('after remove item',afterRemove)
  setCart(afterRemove);
}



  return (
    <WishlistItems.Provider value={{ whishlistprod, setWhishlist, addToWhishlist,removeWish }}>
      <CartItem.Provider value={{ cart, clearCart, setCart, addToCart,increaseQty,decreaseQty,removeItem,removeWish }}>
        <Header />
        <Outlet />
        <Footer />
      </CartItem.Provider>
    </WishlistItems.Provider>
  );
}

export default Home;
