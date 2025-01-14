import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { useState } from "react"
import { reset_password } from "../store/actions/auth";
import { Button, FormField, Form, Image, Message } from "semantic-ui-react";

function ResetPassword ({ reset_password, message, resetSuccess }) {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
    });
    
    const { email } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        reset_password(email)
        if (resetSuccess) {
            setTimeout(() => { navigate('/login/') }, 3500)
        }
    }

   

    return (
        <div className="flex flex-col items-center justify-evenly">
            <div className="w-3/4 max-w-[500px] p-5 mt-5 mb-10 flex flex-col bg-[#26282B] rounded-lg shadow-md shadow-inner">
                <div className="flex flex-col items-center">
                    <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1010.png"/>
                    <h6 className="mont text-white text-2xl md:text-4xl -mt-2"> reset your password </h6>
                </div>
                {message && (
                        <Message positive>
                            <Message.Header>{message}</Message.Header>
                        </Message>
                )}
                <Form onSubmit={handleSubmit} className="p-5">
                    <FormField>
                        <label className="!text-white" htmlFor='email'>Email:</label>
                        <input 
                            className='!bg-black !bg-opacity-30 !text-white'
                            type='email'
                            name='email'
                            value={email}
                            onChange={e => handleChange(e)}
                            required
                        />
                    </FormField>
                    <div className="flex flex-col items-center justify-evenly mt-8">            
                        <Button type="submit" className="!bg-[#90B8F8] hover:!bg-[#5F85DB] active:translate-y-0.5">REQUEST NEW PASSWORD</Button>   
                    </div>            
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    message: state.auth.message,
    resetSuccess: state.auth.resetSuccess
});

export default connect(mapStateToProps, { reset_password })( ResetPassword );