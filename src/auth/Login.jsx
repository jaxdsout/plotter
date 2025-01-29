import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { useState, useEffect } from "react"
import { auth_user, login } from "../store/actions/auth";
import { Button, Divider, Form, FormField, Message, Image, Popup } from "semantic-ui-react";

function Login ({ login, isAuthenticated, error, message, auth_user }) {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const { email, password } = formData;

    const normalizeEmail = (email) => email.trim().toLowerCase();

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        const normalizedEmail = normalizeEmail(email);
        login(normalizedEmail, password);
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard/home');
        }
    }, [isAuthenticated, navigate]);
    

    return (
        <div className="flex flex-col items-center justify-evenly animator">
            <div className="w-3/4 max-w-[500px] p-5 mt-5 mb-10 flex flex-col bg-[#26282B] rounded-lg shadow-md shadow-inner">
                <div className="mb-2 flex flex-col items-center">
                    <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1005.png"/>
                    <h6 className="mont text-white text-2xl md:text-4xl -mt-5"> sign into the platform </h6>
                </div>
                <Form onSubmit={handleSubmit} className="p-5">
                    {message && (
                        <Message negative>
                            <Message.Header>Login Failed</Message.Header>
                            <p>{message}</p>
                        </Message>
                    )}
                    {message && (
                        <Message positive>
                            <Message.Header>{message}</Message.Header>
                        </Message>
                    )}
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
                    <div className="flex justify-center mt-8 mb-5">
                        <Button type="submit" className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold active:translate-y-0.5">LOGIN</Button>   
                    </div>
                </Form>
                <Divider className="mt-4 mb-4" />
                <div className="flex flex-col sm:flex-col md:flex-row justify-evenly text-center mt-5">            
                    <div className="mb-5">
                        <h6 className="noto-sans text-white mb-4">don't have an account?</h6>
                        <Link to={"/signup/"}><Button inverted className="active:translate-y-0.5">SIGN UP</Button></Link>
                    </div>
                    <div className="mb-5">
                        <h6 className="noto-sans text-white mb-4">forgot your password?</h6>          
                        <Link to={"/reset-password/"}><Button inverted className="active:translate-y-0.5">RESET</Button></Link>
                    </div>
                </div>
                <Divider className="mt-4 mb-4" />
                <div className="flex flex-col sm:flex-col md:flex-row justify-evenly text-center mt-5">            
                    <div className="mb-5">
                        <h6 className="noto-sans text-white mb-4">here for portfolio purposes?</h6>
                        <Popup
                            content={
                                <div>
                                    <p><b>Email:</b> aptatlas.test@gmail.com</p>
                                    <p><b>PW:</b> example123</p>
                                </div>    
                            }
                            trigger={<Button size="tiny" inverted>SANDBOX</Button>}
                        />  
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.ui.error,
    message: state.ui.message
});

export default connect(mapStateToProps, { login, auth_user })( Login );