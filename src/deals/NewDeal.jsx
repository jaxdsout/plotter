import { Form, Modal, Button, FormField } from "semantic-ui-react";
import { useState } from "react";
import { load_deals, new_deal } from "../actions/agent";
import { connect } from "react-redux";
import ClientSearch from "../listmaker/ClientSearch";
import PropertySearch from "../listmaker/PropertySearch";

function NewDeal({ user , load_deals, new_deal }) {
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        property: '',
        rent: '',
        rate: '',
        commission: '',
        flat_fee: '',
        move_date: '',
        unit_no: '',
        lease_term: '',
        client: '',
    });
    const { property, rent, rate, commission, flat_fee, move_date, unit_no,
            lease_term, client } = formData;
    const agent = user.id;
   

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        new_deal(agent, property, rent, rate, commission, flat_fee, move_date, unit_no,
            lease_term, client);
        handleCloseModal();
        load_deals()
    };

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => setShowModal(false);


    return(
        <>
        <div className="d-flex justify-content-end align-items-end">
                <Button onClick={handleOpenModal}>+</Button>
            </div>
            <div className="bg-body-secondary">
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>Add New Deal</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={handleSubmit}>
                            <ClientSearch />
                            <PropertySearch />
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
                                    required
                                />
                            </FormField>
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
    user: state.auth.user,
    error: state.auth.error,
});

export default connect(mapStateToProps, { new_deal, load_deals })(NewDeal);