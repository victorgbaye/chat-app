import React, {useContext} from "react"
import {Link} from "react-router-dom"
import { auth, db } from "../firebase-config"
import {signOut} from "firebase/auth"
import {updateDoc, doc} from "firebase/firestore"
import { AuthContext } from "../context/auth"
import {useNavigate} from "react-router-dom"
const Navbar =  () =>{
    let navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const handleSignout = async() =>{
        await updateDoc(doc(db, "users", auth.currentUser.uid),{
            isOnline: false,
        });
        await signOut(auth);
        navigate("/login")
    };
    return(
        <>
        <h3>
            <Link to="/">Home</Link>
        </h3>
        {
            user ? (
            <>
            <Link to="/profile">profile</Link>
            <button onClick={handleSignout}>Logout</button>
            </>) :
            (
                <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>

                </>
    )
        }
        </>
    )
}
export default Navbar