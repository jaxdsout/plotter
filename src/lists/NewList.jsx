import { useState } from "react";
import axios from "axios";
import { Modal, Button, Search, Form } from "semantic-ui-react";
import MapBox from "../components/MapBox";
import PropertySearch from "./PropertySearch";
import OptionList from "./OptionList";


function NewList({ user }) {
    const [showModal, setShowModal] = useState(false);
    const [listMode, setListMode] = useState(false);
    const [listID, setListID] = useState(null);
    const [options, setOptions] = useState([]);
    const [currentClient, setCurrentClient] = useState({
        id: '',
        full_name: ''
    })
    const [searchResults, setSearchResults] = useState([]);
    const [userSearchForm, setUserSearchForm] = useState({
        agent: user.id,
        client: '',
    });
    const { agent, client } = userSearchForm;


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
                setListID(res.data.id);
                setListMode(true);
            } catch (err) {
                console.error(err);
            }
        }
    };


    const createOption = async (property, list, client) => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            const body = JSON.stringify({ property, list, client });
            console.log(body, "new option body")
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/options/`, body, config);
            } catch (err) {
                console.error(err);
            }
        }
    };


    const all_options = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists/${listID}/`, config);
                setOptions(res.data.options)
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
        setUserSearchForm({ ...userSearchForm, client: result.id });
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
        setListID(null);
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
                            <p>Add Options to New List: {currentClient.full_name}</p>
                        ) : (
                            <p>Create New List</p>
                        )}
                    </Modal.Header>
                    <Modal.Content>
                        <>
                            {listMode ? (
                                <div className="row">
                                    <div className="col-md-6">
                                        <PropertySearch 
                                            createOption={createOption}
                                            listID={listID}
                                            currentClient={currentClient}
                                            all_options={all_options}

                                        />
                                        <OptionList 
                                            options={options}
                                            all_options={all_options}
                                            listID={listID}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <MapBox />
                                    </div>
                                </div>
                            ) : (
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
