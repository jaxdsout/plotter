import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState,  } from "react"

const api_url = process.env.REACT_APP_APIURL

function LoginForm () {
    const navigate = useNavigate()

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

      const [login, setLogin] = useState({
        email: '',
        password: '',
    })
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${api_url}/api-auth/login/`, login, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                navigate('/dashboard');
                console.log('Login successful');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // const token = await axios.post(`${api_url}/auth/`)

    return (
        <div className="loginsignup_shell">
            <h3> sign into the platform </h3>
            <div className="loginsignup_form">
                <form onSubmit={handleLogin}>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' onChange={handleChange}/>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' onChange={handleChange}/> 
                    <button className="nav_button" type="submit">LOGIN</button>     
                    <h3>Don't have an account? <Link to={"/signup/"}>Signup</Link></h3>           
                </form>
            </div>
        </div>
    )
}

export default LoginForm