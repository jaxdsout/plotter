import { useState } from "react";
import { connect } from 'react-redux';
import { Modal, Button, Form, FormField } from "semantic-ui-react";
import { load_clients, new_client } from "../actions/agent";

function NewClient({ user, load_clients, new_client }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
    });
    const { first_name, last_name, email, phone_number } = formData;
    const agent = user.id;

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        new_client(agent, first_name, last_name, email, phone_number)
        handleCloseModal();
        load_clients(agent)
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div className="d-flex justify-content-end align-items-end">
                <Button color="blue" onClick={handleOpenModal}>+</Button>
            </div>
            <div className="bg-body-secondary">
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>Add New Client</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={handleSubmit}>
                            <FormField>
                                <label className="noto-sans" htmlFor='first_name'>First Name:</label>
                                <input
                                    type='text'
                                    name='first_name'
                                    value={first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label className="noto-sans" htmlFor='last_name'>Last Name:</label>
                                <input
                                    type='text'
                                    name='last_name'
                                    value={last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label className="noto-sans" htmlFor='email'>Email:</label>
                                <input
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label className="noto-sans" htmlFor='phone_number'>Phone:</label>
                                <input
                                    type='text'
                                    name='phone_number'
                                    value={phone_number}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <Button type="submit" color="green">CREATE CLIENT</Button>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={handleCloseModal}>CLOSE</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.auth.error,
});

export default connect(mapStateToProps, { new_client, load_clients })(NewClient);