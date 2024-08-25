import { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, FormField } from "semantic-ui-react";

function NewClient({ userID, all_clients }) {
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        agent: userID,
        phone_number: '',
    });

    const { first_name, last_name, email, agent, phone_number } = formData;

    const newClient = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            const body = JSON.stringify({ first_name, last_name, email, agent, phone_number });
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/clients/`, body, config);
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        newClient();
        handleCloseModal();
        all_clients()
    };

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div className="d-flex justify-content-end align-items-end">
                <Button onClick={handleOpenModal}>+</Button>
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

export default NewClient;
