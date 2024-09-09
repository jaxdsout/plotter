import { Form, Modal, Button, FormField } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { load_deals, new_deal } from "../actions/agent";
import { connect } from "react-redux";
import ClientSearch from "../listmaker/ClientSearch";
import PropertySearch from "../listmaker/PropertySearch";

function NewDeal({ user, load_deals, new_deal, q_client, q_property }) {
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        agent: null,
        property: null,
        rent: '',
        rate: '',
        commission: '',
        flat_fee: '',
        move_date: '',
        unit_no: '',
        lease_term: '',
        client: null, 
    });

    const { property, unit_no, move_date, lease_term, rent, rate, commission, flat_fee, agent, client } = formData;

    const handleClientSelect = () => {
        if (q_client) {
            setFormData(prevFormData => ({
                ...prevFormData,
                client: q_client.id
            }));
        }
    };

    const handlePropSelect = () => {
        if (q_property) {
            setFormData(prevFormData => ({
                ...prevFormData,
                property: q_property.id
            }));
        }
    };


    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await new_deal(property, unit_no, move_date, lease_term, rent, rate, commission, flat_fee, agent, client);
        await load_deals();
        handleCloseModal();
    };

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        if (user) {
            setFormData(prevFormData => ({
                ...prevFormData,
                agent: user.id
            }));
        }
    }, [user])

    return (
        <>
            <div className="d-flex justify-content-end align-items-end">
                <Button color="blue" onClick={handleOpenModal}>+</Button>
            </div>
            <div className="bg-body-secondary">
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>Add New Deal</Modal.Header>
                    <Modal.Content>
                        <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                            <div className="d-flex flex-row">
                                <ClientSearch />
                                <Form onSubmit={handleClientSelect}>
                                    <Button color="blue" type="submit">SELECT CLIENT</Button>
                                </Form>
                            </div>
                            <div className="d-flex flex-row">
                                <PropertySearch />
                                <Form onSubmit={handlePropSelect}>
                                    <Button color="blue" type="submit">SELECT PROPERTY</Button>
                                </Form>
                            </div>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <FormField>
                                <label className="noto-sans" htmlFor='unit_no'>Unit Number:</label>
                                <input
                                    type='text'
                                    name='unit_no'
                                    value={unit_no}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label className="noto-sans" htmlFor='move_date'>Move Date:</label>
                                <input
                                    type='date'
                                    name='move_date'
                                    value={move_date}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label className="noto-sans" htmlFor='lease_term'>Lease Term:</label>
                                <input
                                    type='text'
                                    name='lease_term'
                                    value={lease_term}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label className="noto-sans" htmlFor='rent'>Rent:</label>
                                <input
                                    type='number'
                                    name='rent'
                                    value={rent}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label className="noto-sans" htmlFor='rate'>Commission Rate:</label>
                                <input
                                    type='number'
                                    name='rate'
                                    value={rate}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label className="noto-sans" htmlFor='commission'>Total Commission:</label>
                                <input
                                    type='number'
                                    name='commission'
                                    value={commission}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label className="noto-sans" htmlFor='flat_fee'>Flat Fee?:</label>
                                <input
                                    type='number'
                                    name='flat_fee'
                                    value={flat_fee}
                                    onChange={handleChange}
                                    placeholder="Not Required"
                                />
                            </FormField>
                            <Button type="submit" color="green">SUBMIT DEAL</Button>
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
    q_property: state.listmaker.property,
    q_client: state.listmaker.client

});

export default connect(mapStateToProps, { new_deal, load_deals })(NewDeal);
