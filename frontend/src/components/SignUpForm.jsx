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
            const response = await axios.post(`${api_url}/plotter/agents/`, newUser, {
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
        <div className="container-sm sm w-50 pt-5">
            <h6 className="noto-sans-upper"> sign up to use the platform </h6>
            <div className="form-group">
               <form onSubmit={handleSubmit} method="POST">
                    <label htmlFor='first_name' className="noto-sans-upper label">First Name:</label>
                    <input type='text' id='first_name' name='first_name' value={newUser.first_name} onChange={handleChange}/>   
                    <label htmlFor='last_name' className="noto-sans-upper label">Last Name:</label>
                    <input type='text' id='last_name' name='last_name' value={newUser.last_name} onChange={handleChange}/>   
                    <label htmlFor='email' className="noto-sans-upper label">Email:</label>
                    <input type='email' id='email' name='email' value={newUser.email} onChange={handleChange}/>   
                    <label htmlFor='trec_id' className="noto-sans-upper label">TREC ID:</label>
                    <input type='number' id='trec_id' name='trec_id' value={newUser.trec_id} onChange={handleChange} min_length="6" max_length="6"/> 
                    <label htmlFor='password' className="noto-sans-upper label">Password:</label>
                    <input type='password' id='password' name='password' value={newUser.password} onChange={handleChange}/>   
                    <button type="submit" className="noto-sans-upper" >SUBMIT</button>                
                </form>
            </div>
            <h6 className="noto-sans-upper label">Already have an account? <Link to={"/login/"}>Login</Link></h6> 
        </div>
    )
}

export default SignUpForm