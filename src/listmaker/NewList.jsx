import { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Divider } from "semantic-ui-react";
import MapBox from "./MapBox";
import PropertySearch from "./PropertySearch";
import OptionList from "./OptionList";
import ClearOptions from "./ClearOptions";
import ClientSearch from "./ClientSearch";
import SendList from "./SendList";
import { new_list } from "../actions/listmaker";


function NewList({ user, new_list, client }) {
    const [showModal, setShowModal] = useState(false);
    const [listMode, setListMode] = useState(false);

    const handleCreateList = (e) => {
        console.log(user.id, client.id);
        if (user != null && client != null) { 
            new_list(user.id, client.id);
            setListMode(true);
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
        setListMode(false);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setListMode(false);
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
                            <p>Add Options to New List: {client.name}</p>
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
                                        <PropertySearch />
                                        <Divider />
                                        <OptionList />
                                    </div>
                                    <div className="col-md-6">
                                        <MapBox />
                                        <div className="d-flex justify-content-between pt-4">
                                            <ClearOptions />
                                            <SendList />
                                        </div>
                                    </div>
                                </div>
                                </>
                            ) : (
                                <div className="d-flex justify-content-center align-items-end">
                                    <div>
                                        <ClientSearch />
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
    user: state.auth.user,
    error: state.auth.error,
    client: state.listmaker.client,
});

export default connect(mapStateToProps, { new_list })(NewList);