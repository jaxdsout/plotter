import { Divider, Modal, Button, Input } from "semantic-ui-react";
import { useState, useEffect } from "react";
import PropertySearch from "../listmaker/PropertySearch";
import ClientSearch from "../listmaker/ClientSearch";
import { connect } from "react-redux";
import { new_guest_card } from "../actions/agent";

function GuestCard ({ client, property, user, new_guest_card }) {
    const [showModal, setShowModal] = useState(false);
    const [clientSel, setClientSel] = useState(null);
    const [propSel, setPropSel] = useState(null);

    const [formData, setFormData] = useState({
        agent: null,
        client: null,
        prop: null,
        interested: '',
        move_by: ''
    });

    const { interested, move_by } = formData;

    useEffect(() => {
        if (client) {
            setClientSel(client);
        }
    }, [client]);

    useEffect(() => {
        if (property) {
            setPropSel(property);
        }
    }, [property]);

    useEffect(() => {
        if (user) {
            setFormData(prevFormData => ({
                ...prevFormData,
                agent: user.id
            }));
        }
    }, [user]);


    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (client && property) {
            await new_guest_card(property.id, user.id, client.id, interested, move_by);
            handleCloseModal();
        } else {
            console.error("Client or property not selected.");
        }
    };

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = async () => {
        await handleResetDeal();
        setShowModal(false);
    };
    console.log(clientSel)
    const handleResetDeal = () => {
        setFormData({
            agent: user.id,
            property: null,
            client: null, 
            interested: '',
            move_by: ''
        });
        setClientSel(false);
        setPropSel(false);
    };

    return (
        <>
            <div>
                <Button onClick={handleOpenModal} className="button_bg">SEND GUEST CARD</Button>
            </div>
            <div className="bg-body-secondary">
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>Send Guest Card</Modal.Header>
                    <Modal.Content>
                        <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                            <div className="d-flex flex-row align-items-center">
                                <ClientSearch />
                                {clientSel && client !== null ? (
                                    <Button color="black" disabled>CLIENT SELECTED</Button>
                                ) : (
                                    <Button className="button_bg" type="submit">SELECT CLIENT</Button>
                                )}
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <PropertySearch />
                                {propSel && property !== null ? (
                                    <Button color="black" disabled>PROPERTY SELECTED</Button>
                                ) : (
                                    <Button className="button_bg" type="submit">SELECT PROPERTY</Button>
                                )}
                            </div>
                        </div>
                        <Divider />
                        {clientSel && propSel ? (
                            <>
                                <div>
                                    <p>Hey team,</p>
                                    <p>Below is the guest card info for my client {clientSel.first_name}. Please let me know if there are any issues.</p>
                                    <ul>
                                        <li className="mt-3"><strong>Name:</strong> {clientSel.name} </li>
                                        <li className="mt-3"><strong>Phone:</strong> {clientSel.phone_number}</li>
                                        <li className="mt-3"><strong>Email:</strong> {client.email}</li>
                                        <li className="mt-3">
                                            <label htmlFor="interested"><strong>Interested In:</strong></label>
                                            <Input
                                                name="interested"
                                                value={interested}
                                                onChange={handleChange}
                                                size="small"
                                                className="ms-3"
                                            />
                                        </li>
                                        <li className="mt-3">
                                            <label htmlFor="move_by"><strong>Move By:</strong></label>
                                            <Input
                                                name="move_by"
                                                value={move_by}
                                                onChange={handleChange}
                                                size="small"
                                                className="ms-3"
                                            />
                                        </li>
                                    </ul>
                                    <p>Best,</p>
                                    <p>{user?.first_name} {user?.last_name}</p>
                                    <p>{user?.profile?.phone_number}</p>
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                    <Button color="green" onClick={handleSubmit}>SEND</Button>
                                </div>
                            </>
                        ) : (
                            <p>Please select both client and property to proceed.</p>
                        )}
                    </Modal.Content>
                    <Modal.Actions>
                        <div className="d-flex justify-content-between">
                            <Button onClick={handleCloseModal}>CLOSE</Button>
                        </div>
                    </Modal.Actions>
                </Modal>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    property: state.listmaker.property,
    client: state.listmaker.client
});

export default connect(mapStateToProps, { new_guest_card })(GuestCard);
