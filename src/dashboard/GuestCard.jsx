import { Divider, Modal, Button, Input } from "semantic-ui-react";
import { useState, useEffect } from "react";
import PropertySearch from "../listmaker/PropertySearch";
import ClientSearch from "../listmaker/ClientSearch";
import { connect } from "react-redux";
import { new_guest_card } from "../actions/agent";

function GuestCard ({ client, property, user, new_guest_card }) {
    const [showModal, setShowModal] = useState(false);
    const [clientSel, setClientSel] = useState(false);
    const [propSel, setPropSel] = useState(false);

    const [formData, setFormData] = useState({
        agent: null,
        client: null,
        prop: null,
        interested: '',
        move_by: ''
    });

    const { agent, interested, move_by } = formData;

    useEffect(() => {
        if (client) {
            setClientSel(true);
        }
    }, [client]);

    useEffect(() => {
        if (property) {
            setPropSel(true);
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

    // const handleClientSelect = (e) => {
    //     e.preventDefault();
    //     if (client) {
    //         setFormData(prevFormData => ({
    //             ...prevFormData,
    //             client: client.id
    //         }));
    //     }
    // };

    // const handlePropSelect = (e) => {
    //     e.preventDefault();
    //     if (property) {
    //         setFormData(prevFormData => ({
    //             ...prevFormData,
    //             property: property.id
    //         }));
    //     }
    // };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (client && property) {
            await new_guest_card(property.id, agent, client.id, interested, move_by);
            handleCloseModal();
        } else {
            console.error("Client or property not selected.");
        }
    };

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => {
        handleResetDeal();
        setShowModal(false);
    };

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
                <Button onClick={handleOpenModal}>SEND GUEST CARD</Button>
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
                                    <Button color="blue" type="submit">SELECT CLIENT</Button>
                                )}
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <PropertySearch />
                                {propSel && property !== null ? (
                                    <Button color="black" disabled>PROPERTY SELECTED</Button>
                                ) : (
                                    <Button color="blue" type="submit">SELECT PROPERTY</Button>
                                )}
                            </div>
                        </div>
                        <Divider />
                        {clientSel && propSel ? (
                            <>
                                <div>
                                    <p>Hey team,</p>
                                    <p>Below is the guest card info for my client {client.first_name}. Please let me know if there are any issues.</p>
                                    <ul>
                                        <li><strong>Name:</strong> {client.first_name} {client.last_name}</li>
                                        <li><strong>Phone:</strong> {client.phone_number}</li>
                                        <li><strong>Email:</strong> {client.email}</li>
                                        <li>
                                            <label htmlFor="interested"><strong>Interested In:</strong></label>
                                            <Input
                                                name="interested"
                                                value={interested}
                                                onChange={handleChange}
                                                size="small"
                                            />
                                        </li>
                                        <li>
                                            <label htmlFor="move_by"><strong>Move By:</strong></label>
                                            <Input
                                                name="move_by"
                                                value={move_by}
                                                onChange={handleChange}
                                                size="small"
                                            />
                                        </li>
                                    </ul>
                                    <p>Best,</p>
                                    <p>{agent?.first_name} {agent?.last_name}</p>
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
