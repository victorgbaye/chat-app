import React from "react"
import {Link} from "react-router-dom"
const Navbar =  () =>{
    return(
        <>
        <h3>
            <Link to="/">Home</Link>
        </h3>
        <h3>
            <Link to="/register">Register</Link>
        </h3>
        <h3>
            <Link to="/login">Login</Link>
        </h3>
        </>
    )
}
export default Navbar