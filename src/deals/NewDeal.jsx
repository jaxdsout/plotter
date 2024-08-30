import { Form, Modal, Button, FormField } from "semantic-ui-react";
import { useState } from "react";
import { load_deals, new_deal } from "../actions/agent";
import { connect } from "react-redux";

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