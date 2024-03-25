import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const api_url = process.env.REACT_APP_APIURL

function LoginForm () {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post(`${api_url}/login/`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                console.log('Login successful');
                navigate('/dashboard');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }


    return (
        <div className="loginsignup_shell">
            <h3> sign into the platform </h3>
            <div className="loginsignup_form">
                <form onSubmit={handleSubmit}>
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