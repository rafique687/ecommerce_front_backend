import {useContext } from "react";
import { Link } from "react-router-dom"
import { CartItem } from "../context/CartContext";
import { WishlistItems } from "../context/WhishlistItems";
function Header()
{
    const { removeWish} = useContext(WishlistItems);
    const { clearCart,cart,open,setpoupopen}=useContext(CartItem);
   
    return(
        <header>
           <h1 className="brand-name"> <Link to="/" className="brand-name">Nabila Suits</Link></h1>
            <ul className="nav-menu">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/cart">Cart { cart.length}</Link></li>
                <li><Link to="/whishlist">Whishlist</Link></li>
                <li><button onClick={clearCart} className="clear-btn">Clear Cart</button></li>
                <li><button onClick={removeWish} className="clear-btn">Remove Whishlist</button></li>
                <li><button  className="clear-btn" onClick={() => setpoupopen(true)} >Login</button></li>
            </ul>
        </header>
    )
}
export default Header