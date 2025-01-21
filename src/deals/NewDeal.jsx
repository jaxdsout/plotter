import { Form, Modal, Button, FormField, Checkbox, Divider } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { load_deals, new_deal } from "../store/actions/agent";
import { connect } from "react-redux";
import ClientSearch from "../listmaker/ClientSearch";
import PropertySearch from "../listmaker/PropertySearch";

function NewDeal({ user, load_deals, new_deal, client, property }) {
    const [showModal, setShowModal] = useState(false);
    const [clientSel, setClientSel] = useState(false);
    const [propSel, setPropSel] = useState(false);
    const [flatFee, setFlatFee] = useState(false);

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => {
        handleResetDeal();
        setShowModal(false);
    };

    const [formData, setFormData] = useState({
        property: null,
        agent: null,
        client: null, 
        rent: '',
        rate: '',
        commission: '',
        flat_fee: '',
        move_date: '',
        unit_no: '',
        lease_term: '',
    
    });

    const { unit_no, move_date, lease_term, rent, rate, flat_fee, commission } = formData;

    const handleFlatFee = () => {
        if (flatFee) { setFlatFee(false) } else { setFlatFee(true) }
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (client && property) {
            await new_deal(property.id, user.id, client.id, unit_no, move_date, lease_term, rent, rate, flat_fee, commission);
            await load_deals(user.id);
            handleCloseModal();
        }
    };

    const handleResetDeal = () => {
        setFormData({
            agent: null,
            property: null,
            client: null,
            rent: '',
            rate: '',
            commission: '',
            flat_fee: '',
            move_date: '',
            unit_no: '',
            lease_term: '',
        });
        setPropSel(false);
        setClientSel(false);
    }

    useEffect(() => {
        if (user) {
            setFormData(prevFormData => ({
                ...prevFormData,
                agent: user.id
            }));
        }

        if (property) {
            setPropSel(property);
        }

        if (client) {
            setClientSel(client);
        }
    }, [user, property, client]);

    return (
        <>
            <div className="flex justify-center items-center">
                <Button color="blue" onClick={handleOpenModal} className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold">+</Button>
            </div>
            <div>
                <Modal open={showModal} onClose={handleCloseModal} className='!w-11/12 sm:!w-[500px]'>
                    <Modal.Header>
                        <div className="flex flex-row justify-between items-end">
                            Add New Deal
                            <Button className="drop-shadow-sm" color="red" onClick={handleResetDeal}>RESET</Button>
                        </div>
                    </Modal.Header>
                    <Modal.Content>
                        <div className="flex flex-col md:flex-row justify-center">
                            <div className="p-3 text-center">
                                <ClientSearch />
                                <div className="mt-5">
                                    {clientSel && client !== null ? (
                                        <Button size="tiny" color="black" disabled>CLIENT SELECTED</Button>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="p-3 text-center">
                                <PropertySearch />
                                <div className="mt-5">
                                    {propSel && property !== null ? (
                                        <Button size="tiny" color="black" disabled>PROPERTY SELECTED</Button>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Divider />
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
                                <Button className="drop-shadow-sm" type="submit" color="green">SUBMIT DEAL</Button>
                            </div>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <div className="flex flex-row items-end mb-3">
                            <Button className="drop-shadow-sm" onClick={handleCloseModal}>CLOSE</Button>
                        </div>
                    </Modal.Actions>
                </Modal>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    property: state.listmaker.property,
    client: state.listmaker.client,
});

export default connect(mapStateToProps, { new_deal, load_deals })(NewDeal);

