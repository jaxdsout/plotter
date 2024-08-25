import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { useState } from "react"
import { login } from "../actions/auth";
import { Button } from "semantic-ui-react";

function Login ({ login, isAuthenticated }) {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const { email, password } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();

        login(email, password)
    }

    if (isAuthenticated) {
        return navigate('/dashboard/');
    }

    return (
        <div className="container-sm sm w-50 pt-5">
            <h6 className="noto-sans-upper"> sign into the platform </h6>
            <form onSubmit={handleSubmit}>
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
                    <label className="noto-sans-upper label" htmlFor='password'>Password:</label>
                    <input 
                        className='form-control'
                        type='password'
                        name='password'
                        value={password}
                        onChange={e => handleChange(e)}
                        minLength='8'
                        required
                    />
                </div>
                <Button type="submit">LOGIN</Button>   
            </form>
            <h6 className="noto-sans-upper pt-5 label">Don't have an account? <Link to={"/signup/"}>Signup</Link></h6>
            <h6 className="noto-sans-upper pt-5 label">Forgot your password? <Link to={"/reset-password/"}>Reset Password</Link></h6>                      
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })( Login );