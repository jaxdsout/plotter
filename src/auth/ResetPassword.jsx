import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { useState } from "react"
import { reset_password } from "../actions/auth";
import { Button, FormField, Form, Image } from "semantic-ui-react";

function ResetPassword ({ reset_password }) {
    const navigate = useNavigate()

    const [requestSent, setRequestSent] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
    });
    
    const { email } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        reset_password(email)
        setRequestSent(true);
    }

    if (requestSent) {
        return navigate('/login/');
    }

    return (
        <div className="container-sm sm w-50 pt-5">
            <div className="mb-4 d-flex flex-column align-items-center">
                <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1001.jpg"/>
                <h6 className="poetsen tagline text-nowrap"> sign into the platform </h6>
            </div>
            <Form onSubmit={handleSubmit}>
                <FormField>
                    <label className="input_label" htmlFor='email'>Email:</label>
                    <input 
                        className='input_bg'
                        type='email'
                        name='email'
                        value={email}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <div className="d-flex justify-content-center mt-4">
                    <Button type="submit" className="button_bg">REQUEST NEW PASSWORD</Button>   
                </div>            
            </Form>
        </div>
    )
}


export default connect(null, { reset_password })( ResetPassword );