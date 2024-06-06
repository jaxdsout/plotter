import { useState } from "react";
import { connect } from "react-redux";
import { update_client } from "../actions/dash";
import { Link } from "react-router-dom";

function ClientDetail ({ client, update_client }) {
    console.log(client)

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
        update_client(first_name, last_name, email, phone_number)
        
    }

    return (
        <div className="container">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="noto-sans-upper label" htmlFor='first_name'>First Name:</label>
                        <input 
                            className='form-control'
                            type='text'
                            name='first_name'
                            placeholder={client.first_name}
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
                            placeholder={client.last_name}
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
                            value={client.email}
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
                            value={client.phone_number}
                            onChange={e => handleChange(e)}
                            required
                        />
                    </div>
                    <button className="noto-sans-upper" type="submit">UPDATE CLIENT</button>   
                </form> 
            </div>
            <div>
                <button>
                    lists 
                </button>
                <button>
                    deals
                </button>
            </div>
        </div>

        
    )
}

export default connect(null, { update_client })( ClientDetail );