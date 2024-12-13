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
        property: null,
        rent: '',
        rate: '',
        commission: '',
        flat_fee: '',
        move_date: '',
        unit_no: '',
        lease_term: '',
        agent: null,
        client: null, 
    });


    const { property, unit_no, move_date, lease_term, rent, rate, flat_fee, commission, agent, client } = formData;


    const handleClientSelect = () => {
        if (q_client) {
            setFormData(prevFormData => ({
                ...prevFormData,
                client: q_client.id,
                agent: user.id
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
        await load_deals(user.id);
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
            <div className="flex justify-center items-center">
                <Button color="blue" onClick={handleOpenModal} className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold">+</Button>
            </div>
            <div>
                <Modal open={showModal} onClose={handleCloseModal} className="!w-[500px]">
                    <Modal.Header>Add New Deal</Modal.Header>
                    <Modal.Content>
                        <div className="flex flex-col justify-between items-start mb-4">
                            <div className="flex flex-row items-center justify-start mb-2">
                                <ClientSearch />
                                <Form onSubmit={handleClientSelect}>
                                    {clientSel && client !== null ? (
                                        <Button color="black">CLIENT SELECTED</Button>
                                    ): (
                                        <Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold" type="submit">SELECT CLIENT</Button>
                                    )}
                                </Form>
                            </div>
                            <div className="flex flex-row items-center mb-2">
                                <PropertySearch />
                                <Form onSubmit={handlePropSelect}>
                                    {propSel && property !== null ? (
                                        <Button color="black">PROPERTY SELECTED</Button>
                                    ): (
                                        <Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold" type="submit">SELECT PROPERTY</Button>
                                    )}
                                </Form>
                            </div>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <FormField>
                                <label htmlFor='unit_no'>Unit Number:</label>
                                <input
                                    type='text'
                                    name='unit_no'
                                    value={unit_no}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label htmlFor='move_date'>Move Date:</label>
                                <input
                                    type='date'
                                    name='move_date'
                                    value={move_date}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label htmlFor='lease_term'>Lease Term:</label>
                                <input
                                    type='text'
                                    name='lease_term'
                                    value={lease_term}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label htmlFor='rent'>Rent:</label>
                                <input
                                    type='number'
                                    name='rent'
                                    value={rent}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label htmlFor='rate'>Commission Rate:</label>
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
                                <label htmlFor='flat_fee'>
                                    <div className="flex flex-row justify-start items-start -mb-2" >
                                        <p>Flat Fee?:</p> 
                                        <Checkbox toggle  className="pl-2" onClick={handleFlatFee}/>
                                    </div>
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
                                <label htmlFor='commission'>Total Commission:</label>
                                <input
                                    type='number'
                                    name='commission'
                                    value={commission}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <div className="flex justify-center">
                                <Button type="submit" color="green">SUBMIT DEAL</Button>
                            </div>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <div className="flex justify-between">
                            <Button color="red" onClick={handleResetDeal}>RESET</Button>
                            <Button onClick={handleCloseModal}>CLOSE</Button>
                        </div>
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
