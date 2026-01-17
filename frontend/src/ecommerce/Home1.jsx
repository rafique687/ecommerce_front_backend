import React from 'react';
import { useState, useEffect } from 'react';
import './ecommerce.css';
import './cart.css';
import './LoginPouup.css';
import './nav.css';
import { CartItem } from '../ecommerce/context/CartContext.jsx';
import { WishlistItems } from '../ecommerce/context/WhishlistItems.jsx';
import { Outlet } from 'react-router-dom';
import Footer from './component/Footer.jsx';
import Header from './component/Header.jsx';
import LoginPopup from './component/LoginPopup.jsx';

function Home1(){
  // const [open, setOpen] = useState(true);
    const [open, setOpen] = useState(false);

    function setpoupopen(value)
    { 
      console.log("set popup called",value);
      if(value === false){
        setOpen(false);
      }else {
          setOpen(true);

      }
      }
    
    
       const [cart, setCart] = useState(
    localStorage.getItem("CartItems")
      ? JSON.parse(localStorage.getItem("CartItems"))
      : []  );
      const [whishlistprod, setWhishlist]= useState(
        localStorage.getItem("WishlistItems")
        ? JSON.parse(localStorage.getItem("WishlistItems")):[]); 

     useEffect(() =>{ 
      if(whishlistprod.length >0){
        localStorage.setItem("WishlistItems", JSON.stringify(whishlistprod));
      }
     }, [whishlistprod] ); 

     function addToCart(idToAdd) {
      const productExists = cart.find(item => item._id === idToAdd._id);
        if(productExists)
        {  
            const updatedCart = cart.map(item => item._id === idToAdd._id ?
             { ...item, quantity: item.quantity + 1}: item );
             setCatt(updatedCart);
                    }
         else{
          const productToadd = { ...idToAdd, quantity:1 }
           setCart([...cart,{ ...idToAdd, quantity:1 }]);
        
      }
  }
   useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("CartItems", JSON.stringify(cart));
    }
  }, [cart]);
  

  function increaseQty(id) {
    const updatQnty = cart.map(item => item._id === id ?{ ...item, quantity: item.quantity +1 } : item );
    setCart(updatQnty);
    }
    function decreaseQty(id) { console.log("decrease qty called");
      const updateQntity = cart.map(item => item._id === id ?{...item, quantity: item.quantity -1}: item);
      setCart(updateQntity);
    }

    function clearCart(){ 
      // localStorage.removeItem("CartItems");
      //console.log(Object.keys(localStorage));
      localStorage.removeItem("CartItems"); // Make sure this matches the saved key!
      setCart([]);
    }
    function removeWish(){
      localStorage.removeItem("WishlistItems");
      setWhishlist([]);
    }
    
    function removeItem(id){
      const filteredCart = cart.filter(item => item._id !== id);
      setCart (filteredCart);
    }

//    function addToWhishlist(productToWhishlist)
//     {
//      const exists = whishlistprod.some(item => item._id === productToWhishlist._id);

//      if (!exists) {
//        setWhishlist([...whishlistprod, productToWhishlist]);
//    }
// }
async function addToWhishlist(whishlistprod)  {
   
    try {
      //const response = await fetch('http://localhost:5000/api/categories', {
      const response = await fetch('http://localhost:5000/api/user/whishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: whishlistprod._id,token: "kkk" }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Category added successfully!');
        setCategory('');
      } else {
        setMessage(data.message || 'Failed to add category');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error. Please try again.');
    }
  }


    useEffect(() =>{
      if(whishlistprod.length > 0){
        localStorage.setItem("whislistItems", JSON.stringify(whishlistprod))
      }
    },[whishlistprod]);            


     return (
      
       <CartItem.Provider value={{ addToCart,cart,increaseQty,clearCart,decreaseQty,removeItem,open,setpoupopen}} >
        <WishlistItems.Provider value={{ addToWhishlist,whishlistprod,removeWish}} >
          <Header/>
        <LoginPopup isOpen={open} onClose={() => setpoupopen(false)} />
        <Outlet />
        </WishlistItems.Provider>
        </CartItem.Provider>
      
     
  );
}

export default Home1;