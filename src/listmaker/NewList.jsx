import { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Search, Form, Divider } from "semantic-ui-react";
import MapBox from "../components/MapBox";
import PropertySearch from "./PropertySearch";
import OptionList from "./OptionList";
import { new_list, search_clients, clear_options } from "../actions/listmaker";


function NewList({ userID, search_clients, new_list, client_results, clear_options, list }) {
    const [showModal, setShowModal] = useState(false);
    const [listMode, setListMode] = useState(false);

    const [formData, setFormData] = useState({
        agentID: userID,
        clientID: null,
        client_name: null
    })
    
    const { agentID, clientID, client_name } = formData;


    const handleSearchChange = (e, { value }) => {
        if (value.length > 1) {
            search_clients(value, userID);
        }
    };

    const handleResultSelect = (e, { result }) => {
        setFormData({
            ...formData,
            clientID: result.id,
            client_name: result.title
        })
        console.log(formData)
    };

    const handleCreateList = (e) => {
        e.preventDefault();
        console.log(agentID, clientID)
        new_list(agentID, clientID);
        setListMode(true);
    };

    const handleClearOptions = (e) => {
        e.preventDefault();
        clear_options(list); 
    };

    const handleOpenModal = () => {
        setShowModal(true);
        setListMode(false);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setListMode(false);
        setFormData({
            agentID: userID,
            clientID: '',
            client_name: ''
        });
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
                            <p>Add Options to New List: {client_name}</p>
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
                                            clientID={clientID}
                                        />
                                        <Divider />
                                        <OptionList />
                                    </div>
                                    <div className="col-md-6">
                                        <MapBox />
                                        <div className="d-flex justify-content-between pt-4">
                                            <Button type='submit' color='black' onClick={handleClearOptions}>CLEAR LIST</Button>
                                            <Button type='submit' color='green'>SEND LIST</Button>
                                        </div>
                                    </div>
                                </div>
                                </>
                            ) : (
                                <div className="d-flex justify-content-center align-items-end">
                                    <div>
                                        <label htmlFor='client_start_list'>Search Client Name: </label>
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
    client_results: state.listmaker.client_results,
    list: state.listmaker.list.id
});

export default connect(mapStateToProps, { search_clients, new_list, clear_options })(NewList);