import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { useState, useEffect } from "react"
import { login } from "../actions/auth";
import { Button, Divider, Form, FormField, Message, Image } from "semantic-ui-react";

function Login ({ login, isAuthenticated, error, message }) {
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

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="container-sm sm w-50 pt-5">
            <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1005.jpg"/>
            <div className="pb-2">
                <h6 className="noto-sans"> sign into the platform </h6>
            </div>
            <Form onSubmit={handleSubmit}>
                {error && (
                    <Message negative>
                        <Message.Header>Login Failed</Message.Header>
                        <p>{error}</p>
                    </Message>
                )}
                {message && (
                <Message positive>
                    <Message.Header>{message}</Message.Header>
                </Message>
                )}
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
                        required
                    />
                </FormField>
                <Button type="submit">LOGIN</Button>   

            </Form>
            <Divider className="mt-4 mb-4" />
            <div className="d-flex justify-content-evenly">            
                <h6 className="noto-sans">don't have an account? <Link to={"/signup/"}>Signup</Link></h6>
                <h6 className="noto-sans">forgot your password? <Link to={"/reset-password/"}>Reset</Link></h6>                      
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    message: state.auth.message
});

export default connect(mapStateToProps, { login })( Login );