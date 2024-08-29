import { Form, Modal, Button, FormField } from "semantic-ui-react";
import { useState } from "react";
import axios from "axios";

function NewDeal({ user , all_deals }) {
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
        agent: user,
    });

    const { property, rent, rate, commission, flat_fee, move_date, unit_no,
            lease_term, client, agent } = formData;


    const newDeal = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            const body = JSON.stringify({ property, rent, rate, commission, flat_fee, move_date, unit_no,
                lease_term, client, agent });
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/deals/`, body, config);
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        newDeal();
        handleCloseModal();
        all_deals()
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
                    <Modal.Header>Add New Client</Modal.Header>
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

export default NewDeal