import { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Search, Form, Divider } from "semantic-ui-react";
import MapBox from "../components/MapBox";
import PropertySearch from "./PropertySearch";
import OptionList from "./OptionList";
import { new_list, search_clients } from "../actions/listmaker";


function NewList({ userID, search_clients, new_list, client_results }) {
    const [showModal, setShowModal] = useState(false);
    const [listMode, setListMode] = useState(false);

    const [currentClient, setCurrentClient] = useState({
        id: '',
        full_name: ''
    })
    
    const [userSearchForm, setUserSearchForm] = useState({
        agent: userID,
        client: '',
    });
    const { agent, client } = userSearchForm;


    const handleSearchChange = (e, { value }) => {
        if (value.length > 1) {
            search_clients(value, userID);
        }
    };

    const handleResultSelect = (e, { result }) => {
        setCurrentClient({
            id: result.id,
            full_name: result.title
        })
        setUserSearchForm({ ...userSearchForm, client: result.id });
    };

    const handleCreateList = (e) => {
        e.preventDefault();
        console.log(client)
        new_list(agent, client);
        setListMode(true);
    };

    const handleOpenModal = () => {
        setShowModal(true);
        setListMode(false);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setListMode(false);
        setCurrentClient({ id: '', full_name: '' });
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
                                <>
                                <div className="row">
                                    <div className="col-md-6">
                                        <PropertySearch 
                                            currentClient={currentClient}
                                        />
                                        <Divider />
                                        <OptionList />
                                    </div>
                                    <div className="col-md-6">
                                        <MapBox />
                                        <div className="d-flex justify-content-between pt-4">
                                            <Button type='submit' color='black'>CLEAR LIST</Button>
                                            <Button type='submit' color='green'>SEND LIST</Button>
                                        </div>
                                    </div>
                                </div>
                                </>
                            ) : (
                                <div className="d-flex justify-content-center align-items-end">
                                    <div>
                                        <label for='client_start_list'>Search Client Name: </label>
                                        <Search
                                            onSearchChange={handleSearchChange}
                                            onResultSelect={handleResultSelect}
                                            results={client_results.map(client => ({
                                                title: `${client.first_name} ${client.last_name}`,
                                                id: client.id
                                            }))}
                                            id='client_start_list'
                                        />
                                    </div>
                                    <div className="ps-4">
                                        <Form onSubmit={handleCreateList}>
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userID: state.auth.user.id,
    error: state.auth.error,
    client_results: state.listmaker.client_results
});

export default connect(mapStateToProps, { search_clients, new_list })(NewList);