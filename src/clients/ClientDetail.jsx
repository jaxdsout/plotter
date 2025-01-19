import { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormField, Message } from "semantic-ui-react";
import { load_clients, update_client } from "../store/actions/agent";

function ClientDetail ({ client, update_client, user, load_clients, message }) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await update_client(clientID, agent, first_name, last_name, email, phone_number);
        await load_clients(user.id)
    }

    return (
        <>
            <Form onSubmit={handleSubmit} className="min-h-96">
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
                <div className="flex justify-center items-center">
                    <Button className="drop-shadow" type="submit" color="green">UPDATE CLIENT</Button>   
                    {message && (
                        <Message positive size="mini">
                            <Message.Header>{message}</Message.Header>
                        </Message>
                    )}
                </div>
            </Form>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    message: state.agent.message
});

export default connect(mapStateToProps, { update_client, load_clients })(ClientDetail);