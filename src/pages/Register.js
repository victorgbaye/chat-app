import React, {useState} from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth, db} from "../firebase-config"
import {setDoc, doc, Timestamp} from "firebase/firestore"
import {useNavigate} from "react-router-dom"
const Register = () => {
    const [data, setData] = useState({
        name: "",
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
        if(!name || !email || !password){
            setData({...data, error:"All fields are required"})
        }
        try{
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', result.user.uid ),{
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,

            });
            setData({
                name: "",
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
                <button type="submit" disabled={loading}>
                    {loading? 'creating...' : 'Register'}
                    </button>
            </form>
        </div>
    )
}

export default Register
