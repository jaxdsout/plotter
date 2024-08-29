import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormField, Button, Modal } from 'semantic-ui-react';
import ProfileWidget from '../components/ProfileWidget';

function Profile({ user }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        trec: '',
        website: '',
        phone_number: '',
    });
    const { full_name, trec, website, phone_number } = formData;

    console.log(user, "user");

    const saveEdit = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            const body = JSON.stringify({ full_name, trec, website, phone_number });
            try {
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/profiles/${user.profile.id}`, body, config);
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        saveEdit();
    };

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => setShowModal(false);


    return (
        <div className="">
            <div>
            {user ? (
                <ProfileWidget profile={user.profile} />
            ) : (
                <p>Loading user profile...</p>
            )}
            </div>
            <div>
                <Button onClick={handleOpenModal}>UPDATE PROFILE</Button>
            </div>
            <div className="bg-body-secondary">
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>Send Guest Card</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={handleSubmit}>
                            <FormField>
                                <label className="noto-sans-upper label" htmlFor="full_name">Full Name:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="full_name"
                                    value={full_name}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label className="noto-sans-upper label" htmlFor="trec">TREC ID:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="trec"
                                    value={trec}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label className="noto-sans-upper label" htmlFor="website">Website:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="website"
                                    value={website}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label className="noto-sans-upper label" htmlFor="phone_number">Phone:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="phone_number"
                                    value={phone_number}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <Button type="submit">SAVE UPDATES</Button>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={handleCloseModal}>CLOSE</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </div>
    );
}

export default Profile;
