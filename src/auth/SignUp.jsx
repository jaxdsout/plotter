import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { useState } from "react"
import { signup } from "../actions/auth";
import { Button, Divider, Form, FormField } from "semantic-ui-react";

function Signup ({ signup, isAuthenticated }) {
    const navigate = useNavigate()
    const [account, setAccount] = useState(false)

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });
    
    const { first_name, last_name, email, password, re_password } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password)
            setAccount(true)
        }
        
    }

    if (isAuthenticated) {
        return navigate('/');
    }

    if (account) {
        return navigate('/login/')
    }

    return (
        <div className="container-sm sm w-50 pt-5">
            <div className="pb-2">
                <h6 className="noto-sans"> sign up for the platform </h6>
            </div>
            <Form onSubmit={handleSubmit}>
                <FormField>
                    <label className="noto-sans-upper label" htmlFor='first_name'>First Name:</label>
                    <input 
                        className='form-control'
                        type='text'
                        name='first_name'
                        value={first_name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans-upper label" htmlFor='last_name'>Last Name:</label>
                    <input 
                        className='form-control'
                        type='text'
                        name='last_name'
                        value={last_name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans-upper label" htmlFor='email'>Email:</label>
                    <input 
                        className='form-control'
                        type='email'
                        name='email'
                        value={email}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <FormField>
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
                </FormField>
                <FormField>
                <label className="noto-sans-upper label" htmlFor='re_password'>Re-Enter Password:</label>
                    <input 
                        className='form-control'
                        type='password'
                        name='re_password'
                        value={re_password}
                        onChange={e => handleChange(e)}
                        minLength='8'
                        required
                    />
                </FormField>
                <Button>SIGN UP</Button>   
            </Form>
            <Divider className="mt-4 mb-4" />
            <div className="d-flex justify-content-evenly">            
                <h6 className="noto-sans">already have an account? <Link to={"/login/"}>Login</Link></h6>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })( Signup );