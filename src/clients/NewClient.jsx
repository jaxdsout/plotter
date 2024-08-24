import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios";

function NewClient ({ userID }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        agent: userID,
        phone_number: '',
    });

    const { first_name, last_name, email, agent, phone_number } = formData;
    const newClient = async () => {
        if(localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            const body = JSON.stringify({ first_name, last_name, email, agent, phone_number });
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/clients/`, body, config);
                console.log(res.data)
            } catch (err) {
                console.error(err);
            }
        }
    }

    
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        newClient();
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="noto-sans-upper label" htmlFor='first_name'>First Name:</label>
                    <input 
                        className='form-control'
                        type='text'
                        name='first_name'
                        value={first_name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="noto-sans-upper label" htmlFor='last_name'>Last Name:</label>
                    <input 
                        className='form-control'
                        type='text'
                        name='last_name'
                        value={last_name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="noto-sans-upper label" htmlFor='email'>Email:</label>
                    <input 
                        className='form-control'
                        type='email'
                        name='email'
                        value={email}
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="noto-sans-upper label" htmlFor='phone_number'>Phone:</label>
                    <input 
                        className='form-control'
                        type='text'
                        name='phone_number'
                        value={phone_number}
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <button className="noto-sans-upper" type="submit">CREATE CLIENT</button>   
            </form>
        </div>
    )
}



export default NewClient;