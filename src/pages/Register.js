import React, {useState} from 'react'

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password:"",
        error: null,
        loading: false,
    });
    const {name, email, password, error, loading} = data;

    const handleChange = e =>{
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit= async (e) =>{
        e.prevent.default()
        console.log(data);
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
