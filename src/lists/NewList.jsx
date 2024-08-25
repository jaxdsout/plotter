import { useState } from "react";
import axios from "axios";
import { Modal, Button } from "semantic-ui-react";

function NewList({ userID, all_lists }) {
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        agent: userID,
        client: '',
    });

    const { agent, client } = formData;

    const newList = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            const body = JSON.stringify({ agent, client });
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/lists/`, body, config);
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        newList();
        handleCloseModal();
        all_lists()
    };

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <>
                <Button onClick={handleOpenModal}>+</Button>
            </>
            <>
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>Add New List</Modal.Header>
                    <Modal.Content>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="noto-sans-upper label" htmlFor='first_name'>Search Clients:</label>
                                <input
                                    type='text'
                                    name='client'
                                    value={client}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Button type="search" >SEARCH CLIENTS</Button>
                        </form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={handleCloseModal}>CLOSE</Button>
                    </Modal.Actions>
                </Modal>
            </>
        </>
    );
}

export default NewList;
