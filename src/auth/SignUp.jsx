import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { useState } from "react"
import { signup } from "../actions/auth";
import { Button, Divider, Form, FormField, Message, Image } from "semantic-ui-react";
import { useEffect } from "react";

function Signup ({ signup, error, message }) {
    const navigate = useNavigate()
    const [account, setAccount] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: ''
    });
    
    const { first_name, last_name, email, password, re_password } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === re_password) {
            await signup(first_name, last_name, email, password, re_password)
            setAccount(true)
        }
        
    }
    useEffect(() => {
        if (account && !error) {
            return navigate('/login/')
        }
    })
  
    return (
        <div className="container-sm sm w-50 pt-5 pb-5">
            <div className="mb-4 d-flex flex-column align-items-center">
                <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1000.png" className="art_thumb"/>
                <h6 className="poetsen tagline text-nowrap"> sign up for the platform </h6>
            </div>
            <Form onSubmit={handleSubmit}>
                {error && (
                    <Message negative size="mini">
                        <Message.Header>Signup Failed</Message.Header>
                        <p>{error}</p>
                    </Message>
                )}
                {message && (
                        <Message positive size="mini">
                            <Message.Header>Signup Successful</Message.Header>
                            <p>{message}</p>
                        </Message>
                )}
                <FormField>
                    <label className="input_label" htmlFor='first_name'>First Name:</label>
                    <input 
                        className="input_bg"
                        type='text'
                        name='first_name'
                        value={first_name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="input_label" htmlFor='last_name'>Last Name:</label>
                    <input 
                        className="input_bg"
                        type='text'
                        name='last_name'
                        value={last_name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
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
                <FormField>
                <label className="input_label" htmlFor='re_password'>Re-Enter Password:</label>
                    <input 
                        className="input_bg"
                        type='password'
                        name='re_password'
                        value={re_password}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <div className="d-flex justify-content-center mt-4">
                    <Button className="button_bg">SIGN UP</Button>   
                </div>
            </Form>
            <Divider className="mt-4 mb-4" />
            <div className="d-flex flex-column align-items-center justify-content-evenly mt-4">            
                <h6 className="noto-sans text_custom mb-4">already have an account?</h6>
                <Link to={"/login/"}><Button inverted>LOGIN</Button></Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    message: state.auth.message
});

export default connect(mapStateToProps, { signup })( Signup );