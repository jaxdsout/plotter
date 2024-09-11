import { Form, Modal, Button, FormField, Checkbox } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { load_deals, new_deal } from "../actions/agent";
import { connect } from "react-redux";
import ClientSearch from "../listmaker/ClientSearch";
import PropertySearch from "../listmaker/PropertySearch";
import { reset_deal_form } from "../actions/ui";

function NewDeal({ user, load_deals, new_deal, q_client, q_property, reset_deal_form }) {
    const [showModal, setShowModal] = useState(false);
    const [clientSel, setClientSel] = useState(false);
    const [propSel, setPropSel] = useState(false);
    const [flatFee, setFlatFee] = useState(false);

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


    const { property, unit_no, move_date, lease_term, rent, rate, flat_fee, commission, agent, client } = formData;


    const handleClientSelect = () => {
        if (q_client) {
            setFormData(prevFormData => ({
                ...prevFormData,
                client: q_client.id
            }));
            setClientSel(true)
        }
    };

    const handlePropSelect = () => {
        if (q_property) {
            setFormData(prevFormData => ({
                ...prevFormData,
                property: q_property.id
            }));
            setPropSel(true)
        }
        if (propSel) {
            setPropSel(false)
        }
    };

    const handleFlatFee = () => {
        if (flatFee) {
            setFlatFee(false)
        } else {
            setFlatFee(true)
        }
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await new_deal(property, unit_no, move_date, lease_term, rent, rate, flat_fee, commission, agent, client);
        await load_deals(agent);
        handleCloseModal();
    };

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => {
        handleResetDeal();
        setShowModal(false);
    };

    const handleResetDeal = () => {
        setPropSel(false);
        setClientSel(false);
        setFormData({
            agent: user.id,
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
        reset_deal_form();
    }

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
                            <div className="d-flex flex-row align-items-center">
                                <ClientSearch />
                                <Form onSubmit={handleClientSelect}>
                                    {clientSel && client !== null ? (
                                        <Button color="black">CLIENT SELECTED</Button>
                                    ): (
                                        <Button color="blue" type="submit">SELECT CLIENT</Button>
                                    )}
                                </Form>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <PropertySearch />
                                <Form onSubmit={handlePropSelect}>
                                    {propSel && property !== null ? (
                                        <Button color="black">PROPERTY SELECTED</Button>
                                    ): (
                                        <Button color="blue" type="submit">SELECT PROPERTY</Button>
                                    )}
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
                                {flatFee ? (
                                    <input
                                        type='number'
                                        name='rate'
                                        value={rate}
                                        disabled
                                    />
                                ) : (
                                    <input
                                        type='number'
                                        name='rate'
                                        value={rate}
                                        onChange={handleChange}
                                        required
                                    />
                                )}
                                
                            </FormField>
                            <FormField>
                                <label className="noto-sans d-flex align-items-center" htmlFor='flat_fee'>
                                    Flat Fee?: <Checkbox toggle  className="ps-2" onClick={handleFlatFee}/>
                                </label>
                                {flatFee ? (
                                    <input
                                        type='number'
                                        name='flat_fee'
                                        value={flat_fee}
                                        onChange={handleChange}
                                        required
                                    />
                                ) : (
                                    <input
                                        type='number'
                                        name='flat_fee'
                                        value={flat_fee}
                                        disabled
                                    />
                                )}
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
                            <Button type="submit" color="green">SUBMIT DEAL</Button>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" onClick={handleResetDeal}>RESET</Button>
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

export default connect(mapStateToProps, { new_deal, load_deals, reset_deal_form })(NewDeal);
