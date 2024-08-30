import { useState } from 'react';
import { Form, FormField, Button, Modal } from 'semantic-ui-react';
import ProfileWidget from '../components/ProfileWidget';
import { connect } from 'react-redux';
import { update_profile } from '../actions/agent';

function Profile({ user, update_profile }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        trec: '',
        website: '',
        phone_number: '',
    });
    const { full_name, trec, website, phone_number } = formData;
    const userID = user.id


    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        update_profile(userID, full_name, trec, website, phone_number);
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    user: state.auth.user
});

export default connect(mapStateToProps, { update_profile })(Profile);