import { useState } from "react";
import axios from "axios";
import { Modal, Button, Search, Form, FormField } from "semantic-ui-react";
import MapBox from "./MapBox";

function NewList({ userID, all_lists }) {
    const [showModal, setShowModal] = useState(false);
    
    const [selectedClient, setSelectedClient] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    
    const [formData, setFormData] = useState({
        agent: userID,
        client: selectedClient,
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
            console.log(body, "new list body")
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/lists/`, body, config);
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const searchClients = async (query) => {
        console.log(localStorage.getItem('access'))
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            try {
                console.log(userID, "user id")
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/clients/?agent=${userID}&search=${query}`, config);
                setSearchResults(res.data);
                console.log(searchResults, "search results")
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSearchChange = (e, { value }) => {
        if (value.length > 1) {
            searchClients(value);
        }
    };

    const handleResultSelect = (e, { result }) => {
        setSelectedClient(result.id);
        console.log(selectedClient, "selectedClient")
        setFormData({ ...formData, client: result.id });
    };

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
            <div className="d-flex justify-content-end align-items-end">
                <Button onClick={handleOpenModal}>+</Button>
            </div>
            <div className="bg-body-secondary">
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>Add New List</Modal.Header>
                    <Modal.Content>
                        <>
                            <div className="d-flex">
                            <Search
                                onSearchChange={handleSearchChange}
                                onResultSelect={handleResultSelect}
                                results={searchResults.map(client => ({
                                    title: `${client.first_name} ${client.last_name}`,
                                    id: client.id
                                }))}
                            />
                            <div>
                                <p>{selectedClient} </p>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Button type="submit">CREATE LIST</Button>
                            </Form>
                            </div>
                            <div>
                                <MapBox />
                            </div>
                        </>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={handleCloseModal}>CLOSE</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </>
    );
}

export default NewList;
