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
            navigate('/dashboard/home');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="container-sm sm w-50 pt-5">
            <div className="mb-4 d-flex flex-column align-items-center">
                <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1005.png" className="art_thumb"/>
                <h6 className="poetsen tagline text-nowrap"> sign into the platform </h6>
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
                <label className="input_label" htmlFor='email'>Email:</label>
                    <input 
                        className="input_bg"
                        type='email'
                        name='email'
                        value={email}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                <label className="input_label" htmlFor='password'>Password:</label>
                    <input 
                        className="input_bg"
                        type='password'
                        name='password'
                        value={password}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <div className="d-flex justify-content-center">
                    <Button type="submit" className="button_bg">LOGIN</Button>   
                </div>
            </Form>
            <Divider className="mt-4 mb-4" />
            <div className="d-flex flex-md-row justify-content-evenly flex-sm-column flex-column text-center">            
                <div className="mb-4">
                    <h6 className="noto-sans text-white mb-4">don't have an account?</h6>
                    <Link to={"/signup/"}><Button inverted>SIGN UP</Button></Link>
                </div>
                <div className="mb-4">
                    <h6 className="noto-sans text-white mb-4">forgot your password?</h6>          
                    <Link to={"/reset-password/"}><Button inverted>RESET</Button></Link>
                </div>
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