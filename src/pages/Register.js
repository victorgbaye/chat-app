import React, {useState} from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../firebase-config"
const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password:"",
        error: null,
        loading: false,
    });
    const {name, email, password, error, loading} = data;

    const handleChange = (e) =>{
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit= async (e) =>{
        e.preventDefault();
        setData({...data, error:null, loading:true})
        console.log(data);
        if(!name || !email || !password){
            setData({...data, error:"All fields are required"})
        }
        try{
            const result = await createUserWithEmailAndPassword(auth, email, password)
            console.log(result.user);
        }catch(err){}
    }
    return (
        <div>
            <h3>Create An Account</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={name} onChange={handleChange}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={handleChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleChange}/>
                </div>
                {error ? <p>{error}</p>: null}
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
