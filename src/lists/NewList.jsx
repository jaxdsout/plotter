import { useState } from "react";
import axios from "axios";
import { Modal, Button, Search, Form, FormField, Divider } from "semantic-ui-react";
import MapBox from "../components/MapBox";
import PropertySearch from "../components/PropertySearch";
import OptionList from "./OptionList";

function NewList({ user }) {
    const [showModal, setShowModal] = useState(false);
    const [currentList, setCurrentList] = useState(null);
    const [currentClient, setCurrentClient] = useState({
        id: '',
        full_name: ''
    })

    const [searchResults, setSearchResults] = useState([]);
    const [listMode, setListMode] = useState(false)
    
    const [formData, setFormData] = useState({
        agent: user.id,
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
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/lists/`, body, config);
                console.log(res.data, "newList payload")
                setCurrentList(res.data)
                setListMode(true)
            } catch (err) {
                console.error(err);
            }
        }
    };

    const searchClients = async (query) => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients/?agent=${user.id}&search=${query}`, config);
                setSearchResults(res.data);
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
        setCurrentClient({
            id: result.id,
            full_name: result.title
        })
        setFormData({ ...formData, client: result.id });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        newList();
    };

    const handleOpenModal = () => {
        setShowModal(true);
        setListMode(false)
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setListMode(false);
        setCurrentClient({ id: '', full_name: '' });
        setCurrentList(null);
    }

    return (
        <>
            <div className="d-flex justify-content-end align-items-end">
                <Button onClick={handleOpenModal}>+</Button>
            </div>
            <div className="bg-body-secondary">
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>
                        {listMode ? (
                            <p>Add Options to New List</p>
                        ): (
                            <p>Create New List</p>
                        )}
                    </Modal.Header>
                    <Modal.Content>
                        <>
                            {listMode ? (
                                <div className="row">
                                    <div className="col-md-6">
                                        <PropertySearch 
                                            currentList={currentList}
                                            currentClient={currentClient}
                                        />
                                        <OptionList />
                                    </div>
                                    <div className="col-md-6">
                                        <MapBox />
                                    </div>
                                </div>
                            ): (
                                <div className="d-flex justify-content-evenly">
                                    <div>
                                    <p>Search Client Name: </p>
                                    <Search
                                        onSearchChange={handleSearchChange}
                                        onResultSelect={handleResultSelect}
                                        results={searchResults.map(client => ({
                                            title: `${client.first_name} ${client.last_name}`,
                                            id: client.id
                                        }))}
                                    />
                                    </div>
                                    <div>
                                        <h6>
                                            Client Name: {currentClient.full_name}
                                        </h6>
                                    <Form onSubmit={handleSubmit}>
                                        <Button type="submit">START LIST</Button>
                                    </Form>
                                    </div>
        
                                </div>
                            )}
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
