import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";

const api_url = process.env.REACT_APP_APIURL

function SignUpForm () {
    
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        trec_id: '',
        password: '',
    });

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${api_url}/agents/`, newUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                console.log('User registered successfully');
            } else {
                console.error('Error:', response.data);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    
    return (
        <div className="loginsignup_shell">
            <h3> sign up to use the platform </h3>
            <div className="loginsignup_form">
               <form onSubmit={handleSubmit} method="POST">
                    <label htmlFor='first_name'>First Name:</label>
                    <input type='text' id='first_name' name='first_name' value={newUser.first_name} onChange={handleChange}/>   
                    <label htmlFor='last_name'>Last Name:</label>
                    <input type='text' id='last_name' name='last_name' value={newUser.last_name} onChange={handleChange}/>   
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' value={newUser.email} onChange={handleChange}/>   
                    <label htmlFor='trec_id'>TREC ID:</label>
                    <input type='number' id='trec_id' name='trec_id' value={newUser.trec_id} onChange={handleChange} min_length="6" max_length="6"/> 
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' value={newUser.password} onChange={handleChange}/>   
                    <button type="submit" className="nav_button" >SUBMIT</button>                
                </form>
            </div>
            <h3>Already have an account? <Link to={"/login/"}>Login</Link></h3> 
        </div>
    )
}

export default SignUpForm