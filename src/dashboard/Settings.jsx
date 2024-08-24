import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios";

function Settings () {
    const [formData, setFormData] = useState({
        full_name: '',
        trec: '',
        website: '',
        phone_number: '',
    });

    const { full_name, trec, website, phone_number } = formData;

    const saveEdit = async () => {
        if(localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            const body = JSON.stringify({ full_name, trec, website, phone_number });
            try {
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/profiles/`, body, config);
                console.log(res.data)
            } catch (err) {
                console.error(err);
            }
        }
    }

    
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        saveEdit();
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="noto-sans-upper label" htmlFor='full_name'>Full Name:</label>
                    <input 
                        className='form-control'
                        type='text'
                        name='full_name'
                        value={full_name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="noto-sans-upper label" htmlFor='trec'>TREC ID:</label>
                    <input 
                        className='form-control'
                        type='text'
                        name='trec'
                        value={trec}
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="noto-sans-upper label" htmlFor='website'>Website:</label>
                    <input 
                        className='form-control'
                        type='text'
                        name='website'
                        value={website}
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
                <button className="noto-sans-upper" type="submit">UPDATE PROFILE</button>   
            </form>
        </div>
    )
}

export default Settings; 