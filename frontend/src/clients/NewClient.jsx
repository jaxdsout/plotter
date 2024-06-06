import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { useState } from "react"
import { new_client } from "../actions/dash";

function NewClient ({ new_client }) {
    // const navigate = useNavigate()

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
    });
    
    const { first_name, last_name, email, phone_number } = formData;

    
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        new_client(first_name, last_name, email, phone_number)
        
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
                        type='tel'
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



export default connect(null, { new_client })( NewClient );