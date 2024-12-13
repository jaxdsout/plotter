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

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            await new_client(user.id, first_name, last_name, email, phone_number)
            await load_clients(user.id)
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
            })
            handleCloseModal();
        }
    };

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
        })
        setShowModal(false);
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <Button color="blue" onClick={handleOpenModal} className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold">+</Button>
            </div>
            <div>
                <Modal open={showModal} onClose={handleCloseModal} className="!w-[500px]">
                    <Modal.Header className="text-center">Add New Client</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={handleSubmit}>
                            <FormField>
                                <label htmlFor='first_name'>First Name:</label>
                                <input
                                    type='text'
                                    name='first_name'
                                    value={first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label htmlFor='last_name'>Last Name:</label>
                                <input
                                    type='text'
                                    name='last_name'
                                    value={last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label htmlFor='email'>Email:</label>
                                <input
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label htmlFor='phone_number'>Phone:</label>
                                <input
                                    type='text'
                                    name='phone_number'
                                    value={phone_number}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <div className="flex justify-center">
                                <Button type="submit" color="green" >CREATE CLIENT</Button>
                            </div>
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