import React, {useState} from 'react'
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth, db} from "../firebase-config"
import {doc, updateDoc, } from "firebase/firestore"
import {useNavigate} from "react-router-dom"
const Login = () => {
    const [data, setData] = useState({
        email: "",
        password:"",
        error: null,
        loading: false,
    });
    let navigate = useNavigate()
    const {name, email, password, error, loading} = data;

    const handleChange = (e) =>{
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit= async (e) =>{
        e.preventDefault();
        setData({...data, error:null, loading:true})
        console.log(data);
        if(!email || !password){
            setData({...data, error:"All fields are required"})
        }
        try{
            const result = await signInWithEmailAndPassword(auth, email, password);
            await updateDoc(doc(db, 'users', result.user.uid ),{
                isOnline: true,
            });
            setData({
                email: "",
                password: "",
                error: null,
                loading: false,
            })
            navigate("/");
        }catch(err){
            setData({...data, error: err.message, loading:false})
        }
    }
    return (
        <div>
            <h3>Login to your Account</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={handleChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleChange}/>
                </div>
                {error ? <p>{error}</p>: null}
                <button type="submit" disabled={loading}>
                    {loading? 'Logging in...' : 'Login'}
                    </button>
            </form>
        </div>
    )
}

export default Login
