import { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormField } from "semantic-ui-react";
import { update_client } from "../actions/agent";

function ClientDetail ({ client, update_client, user }) {
    const [formData, setFormData] = useState({
        agent: user.id,
        first_name: client.first_name || '',
        last_name: client.last_name || '',
        email: client.email || '',
        phone_number: client.phone_number || '',
    });

    const clientID = client.id;
    
    const { agent, first_name, last_name, email, phone_number } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        update_client(clientID, agent, first_name, last_name, email, phone_number);
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormField>
                    <label className="noto-sans" htmlFor='first_name'>First Name:</label>
                    <input 
                        type='text'
                        name='first_name'
                        value={first_name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans" htmlFor='last_name'>Last Name:</label>
                    <input 
                        type='text'
                        name='last_name'
                        value={last_name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans" htmlFor='email'>Email:</label>
                    <input 
                        type='email'
                        name='email'
                        value={email}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans" htmlFor='phone_number'>Phone:</label>
                    <input 
                        type='tel'
                        name='phone_number'
                        value={phone_number}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <Button type="submit">UPDATE CLIENT</Button>   
            </Form>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    user: state.auth.user
});

export default connect(mapStateToProps, { update_client })(ClientDetail);