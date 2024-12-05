import { Form, FormField, Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import { connect } from "react-redux";
import { load_options, update_option } from "../actions/listmaker";

function UpdateOption ({ option, list, update_option, load_options }) {
    const [showModal, setShowModal] = useState(false);
    const [optionForm, setOptionForm] = useState({
        price: option.price ||'',
        unit_number: option.unit_number || '',
        layout: option.layout || '',
        sq_ft: option.sq_ft || '',
        available: option.available || '',
        notes: option.notes || '',
    });
    const { price, unit_number, layout, sq_ft, available, notes } = optionForm;

    const optionID = option.id;
    const listID = list.id;
    const property = option.property;

    const handleChange = (e) => setOptionForm({ ...optionForm, [e.target.name]: e.target.value });


    const handleSubmit = async (e) => {
        e.preventDefault();
        await update_option(optionID, price, unit_number, layout, sq_ft, available, notes, property, listID);
        await load_options(listID);
        setShowModal(false);
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return(
        <>
        <Button onClick={handleOpenModal}>
            <i class="edit icon"></i>
        </Button>
        <div>
            <Modal open={showModal} onClose={handleCloseModal} className="!w-[500px]">
                <Modal.Header className="text-center">Update Option: {option.prop_name}</Modal.Header>
                <Modal.Content className="bg-dark-subtle">
                    <Form onSubmit={handleSubmit}>
                        <FormField>
                            <label className="noto-sans" htmlFor='price'>Price:</label>
                            <input
                                type='number'
                                name='price'
                                value={price || option.price}
                                onChange={handleChange}
                            />
                        </FormField>
                        <FormField>
                            <label className="noto-sans" htmlFor='unit_number'>Unit Number:</label>
                            <input
                                type='text'
                                name='unit_number'
                                value={unit_number}
                                onChange={handleChange}
                            />
                        </FormField>
                        <FormField>
                            <label className="noto-sans" htmlFor='layout'>Layout:</label>
                            <input
                                type='text'
                                name='layout'
                                value={layout}
                                onChange={handleChange}
                            
                            />
                        </FormField>
                        <FormField>
                            <label className="noto-sans" htmlFor='sq_ft'>Sq Ft:</label>
                            <input
                                type='text'
                                name='sq_ft'
                                value={sq_ft}
                                onChange={handleChange}
                            />
                        </FormField>
                        <FormField>
                            <label className="noto-sans" htmlFor='available'>Available:</label>
                            <input
                                type='date'
                                name='available'
                                value={available}
                                onChange={handleChange}
                            
                            />
                        </FormField>
                        <FormField>
                            <label className="noto-sans" htmlFor='notes'>Notes/Specials:</label>
                            <input
                                type='text'
                                name='notes'
                                value={notes}
                                onChange={handleChange}
                            />
                        </FormField>
                        <Button type="submit" color="green">UPDATE OPTION</Button>
                    </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={handleCloseModal} color="red">CANCEL</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    list: state.listmaker.list,
    error: state.auth.error,
});

export default connect(mapStateToProps, { update_option, load_options })(UpdateOption);