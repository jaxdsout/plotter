import { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Divider } from "semantic-ui-react";
import MapBox from "./MapBox";
import PropertySearch from "./PropertySearch";
import OptionList from "./OptionList";
import ClearOptions from "./ClearOptions";
import ClientSearch from "./ClientSearch";
import SendList from "./SendList";
import ShareURL from "./ShareURL";
import { new_list } from "../actions/listmaker";
import { reset_list_mode, reset_send_mode, set_list_mode } from "../actions/ui"


function NewList({ user, new_list, client, isSendMode, isListMode, reset_list_mode, reset_send_mode, set_list_mode }) {
    const [showModal, setShowModal] = useState(false);

    const handleCreateList = async (e) => {
        console.log(user.id, client.id);
        if (user != null && client != null) { 
            await new_list(user.id, client.id);
            set_list_mode()
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
        reset_list_mode();
    }

    const handleCloseModal = () => {
        setShowModal(false);
        reset_list_mode();
        reset_send_mode()
    }

    console.log("sendmode", isSendMode)
    console.log("listmode", isListMode)
    return (
        <>
            <div className="d-flex justify-content-end align-items-end">
                <Button onClick={handleOpenModal}>+</Button>
            </div>
            <div className="bg-body-secondary">
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>
                        {isListMode ? (
                            <p>Add Options to New List: {client.name}</p>
                        ) : isSendMode ? (
                            <p>Send New List to {client.name}</p>
                        ) : (
                            <p>Create New List</p>
                        )}
                    </Modal.Header>
                    <Modal.Content>
                        <div className="container h-100">
                            {isListMode ? (
                                <div>
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
                                </div>
                            ) : isSendMode ? (
                                <div>
                                   <div className="row">
                                    <div className="col-md-6">
                                       <ShareURL />
                                    </div>
                                    <div className="col-md-6">
                               
                                    </div>
                                </div>
                                </div>
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
                        </div>
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
    isSendMode: state.ui.isSendMode,
    isListMode: state.ui.isListMode
});

export default connect(mapStateToProps, { new_list, reset_list_mode, reset_send_mode, set_list_mode })(NewList);