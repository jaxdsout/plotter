import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { useState } from "react"
import { signup } from "../store/actions/auth";
import { Button, Divider, Form, FormField, Message, Image } from "semantic-ui-react";
import { useEffect } from "react";

function Signup ({ signup, error, message, signupSuccess }) {
    const navigate = useNavigate()

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
            if (signupSuccess) {
                setTimeout(() => { navigate('/login/') }, 3500)
            }
        }
      
    }

  
    return (
        <div className="flex flex-col items-center justify-evenly">
            <div className="w-3/4 max-w-[500px] p-5 mt-5 mb-10 flex flex-col bg-[#26282B] rounded-lg shadow-md shadow-inner">
                <div className="mb-2 flex flex-col items-center">
                    <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1000.png" className="art_thumb"/>
                    <h6 className="mont text-white text-2xl md:text-4xl -mt-5 text-center"> sign up for the platform </h6>
                </div>
                <Form onSubmit={handleSubmit} className="p-5">
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
                        <label className="!text-white" htmlFor='first_name'>First Name:</label>
                        <input 
                            className="!bg-black !bg-opacity-30 !text-white"
                            type='text'
                            name='first_name'
                            value={first_name}
                            onChange={e => handleChange(e)}
                            required
                        />
                    </FormField>
                    <FormField>
                        <label className="!text-white" htmlFor='last_name'>Last Name:</label>
                        <input 
                            className="!bg-black !bg-opacity-30 !text-white"
                            type='text'
                            name='last_name'
                            value={last_name}
                            onChange={e => handleChange(e)}
                            required
                        />
                    </FormField>
                    <FormField>
                        <label className="!text-white" htmlFor='email'>Email:</label>
                        <input 
                            className="!bg-black !bg-opacity-30 !text-white"
                            type='email'
                            name='email'
                            value={email}
                            onChange={e => handleChange(e)}
                            required
                        />
                    </FormField>
                    <FormField>
                    <label className="!text-white" htmlFor='password'>Password:</label>
                        <input 
                            className="!bg-black !bg-opacity-30 !text-white"
                            type='password'
                            name='password'
                            value={password}
                            onChange={e => handleChange(e)}
                            required
                        />
                    </FormField>
                    <FormField>
                    <label className="!text-white" htmlFor='re_password'>Re-Enter Password:</label>
                        <input 
                            className="!bg-black !bg-opacity-30 !text-white"
                            type='password'
                            name='re_password'
                            value={re_password}
                            onChange={e => handleChange(e)}
                            required
                        />
                    </FormField>
                    <div className="flex justify-center mt-8 mb-5">
                        <Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold">SIGN UP</Button>   
                    </div>
                </Form>
                <Divider className="mt-4 mb-4" />
                <div className="flex flex-col items-center justify-evenly mt-5 mb-5">            
                    <h6 className="noto-sans !text-white mb-4">already have an account?</h6>
                    <Link to={"/login/"}><Button inverted>LOGIN</Button></Link>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    message: state.auth.message,
    signupSuccess: state.auth.signupSuccess
});

export default connect(mapStateToProps, { signup })( Signup );