import { Card, CardContent, CardHeader, CardDescription, CardMeta, Image, Form, FormField, Button, Icon, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { update_profile } from '../actions/agent';
import { connect } from 'react-redux';
import { useState } from 'react';

function ProfileWidget ({ user }) {
    const [formData, setFormData] = useState({
        full_name: '',
        trec: '',
        website: '',
        phone_number: '',
    });
    const { full_name, trec, website, phone_number } = formData;
    const userID = user.id
    const profile = user.profile
    console.log(profile, "profile")

    const [showModal, setShowModal] = useState(false);

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        update_profile(userID, full_name, trec, website, phone_number);
    };

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => setShowModal(false);


    return (
        <>
            <Card>
                <Image src={profile.avatar} wrapped ui={false} />
                <CardContent>
                    <CardHeader>{profile.full_name}</CardHeader>
                    <CardMeta>
                        <span className='date'>TREC ID: {profile.trec}</span>
                    </CardMeta>
                    <CardDescription>
                    </CardDescription>
                </CardContent>
                <CardContent extra>
                    <p>Phone: {profile.phone_number}</p>
                    <p>Email: {profile.email}</p>
                    <p>Website: {profile.website}</p>
                </CardContent>
                <CardContent>
                    <Link onClick={handleOpenModal}><Icon name='setting' size='large'/></Link>
                </CardContent>
            </Card>
            <div className="bg-body-secondary">
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>Edit Profile</Modal.Header>
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
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    user: state.auth.user,
});

export default connect(mapStateToProps, { update_profile })(ProfileWidget);