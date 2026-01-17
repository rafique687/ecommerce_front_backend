import React from "react"
import Cookies from "js-cookie";
 import Header from "./Header"
import { Outlet,Link  } from "react-router-dom"
import Footer from "./Footer"
//import { AuthContext } from ".../ecommerce/context/AuthContext.jsx";
import { AuthContext } from "../context/AuthContext"
function Customers(){

    return(
        
        <>
        
        <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Header /  >

      {/* Main content area */}
      <div className="p-4 flex-grow-1 bg-light">
        <Outlet />
         <Footer /> 
      </div>
     
    </div>
        

        
      
      </>
    )
}
export default Customers