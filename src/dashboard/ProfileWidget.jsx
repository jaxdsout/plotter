import { Card, CardContent, CardHeader, CardDescription, CardMeta, Image, Form, FormField, Button, Icon, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { update_profile, update_avatar } from '../store/actions/agent';
import { connect } from 'react-redux';
import { useState } from 'react';
import { Divider } from 'semantic-ui-react'

function ProfileWidget ({ user, update_profile, update_avatar }) {
    const [formData, setFormData] = useState({
        trec: '',
        website: '',
        phone_number: '',
    });
    const [avatar, setAvatar] = useState(null);
    const { trec, website, phone_number } = formData;
    const profile = user.profile

    const [showModal, setShowModal] = useState(false);

    const handleProfileChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAvatarChange = e => setAvatar(e.target.files[0]);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await update_profile(user, trec, website, phone_number);
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        if (avatar) {
            try {
                await update_avatar(user, avatar);
            } catch (err) {
                console.error('Error updating avatar:', err);
            }
        }
    };

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => setShowModal(false);


    return (
        <>
            <Card className='!drop-shadow-xl'>
                <Image src={profile.avatar} wrapped ui={false} />
                <CardContent>
                    <CardHeader>{profile.full_name}</CardHeader>
                    <CardMeta>
                        <span className='date'>TREC ID: {profile.trec}</span>
                    </CardMeta>
                    <CardDescription>
                    <Link onClick={handleOpenModal} className='flex justify-end -mt-11 pb-3'>
                        <Icon name='setting' size='large'/>
                    </Link>
                    </CardDescription>
                </CardContent>
                <CardContent extra>
                    <p>Phone: {profile.phone_number}</p>
                    <p>Email: {profile.email}</p>
                    <p>Website: {profile.website}</p>
                </CardContent>
            </Card>
            <div>
                <Modal className='!w-9/12 sm:!w-[500px]' open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>Edit Profile</Modal.Header>
                    <Modal.Content>
                        <div className='flex flex-col justify-evenly'>
                            <div>                    
                                <Form onSubmit={handleProfileSubmit}>
                                    <FormField>
                                        <label className="noto-sans-upper label" htmlFor="trec">TREC ID:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="trec"
                                            value={trec}
                                            onChange={handleProfileChange}
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
                                            onChange={handleProfileChange}
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
                                            onChange={handleProfileChange}
                                            required
                                        />
                                    </FormField>
                                    <div className='flex justify-center mt-5 mb-5'>
                                        <Button color="green" type="submit">SAVE PROFILE UPDATES</Button>
                                    </div>
                                </Form>
                            </div>  
                            <Divider />
                            <div className='mt-4 mb-5'>
                                <Form onSubmit={handleAvatarSubmit}>
                                    <FormField>
                                        <label className="noto-sans-upper label" htmlFor="avatar">Profile Picture:</label>
                                        <input
                                            className="rounded-lg"
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                        />
                                    </FormField>
                                    <div className='flex justify-center'>
                                        <Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB]" type="submit">UPLOAD</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
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

export default connect(mapStateToProps, { update_profile, update_avatar })(ProfileWidget);