import { Link, useNavigate, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { useState } from "react"
import { reset_password_confirm } from "../actions/auth";
import { Button } from "semantic-ui-react";

function ConfirmPassword ({ reset_password_confirm }) {
    const navigate = useNavigate()
    const { uid, token } = useParams();

    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });
    
    const { new_password, re_new_password } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();

        reset_password_confirm(uid, token, new_password, re_new_password)
        setRequestSent(true);
    }

    if (requestSent) {
        return navigate('/login/');
    }

    return (
        <div className="container-sm sm w-50 pt-5">
            <h6 className="noto-sans-upper"> Save a new password </h6>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label className="noto-sans-upper label" htmlFor='password'>Password:</label>
                    <input 
                        className='form-control'
                        type='password'
                        name='new_password'
                        value={new_password}
                        onChange={e => handleChange(e)}
                        minLength='8'
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="noto-sans-upper label" htmlFor='password'>Password:</label>
                    <input 
                        className='form-control'
                        type='password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => handleChange(e)}
                        minLength='8'
                        required
                    />
                </div>
                <Button type="submit">RESET PASSWORD</Button>   
            </form>
    
        </div>
    )
}


export default connect(null, { reset_password_confirm })( ConfirmPassword );