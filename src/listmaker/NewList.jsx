import { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Divider, FormField, Message } from "semantic-ui-react";
import MapBox from "./MapBox";
import PropertySearch from "./PropertySearch";
import OptionList from "./OptionList";
import ClearOptions from "./ClearOptions";
import ClientSearch from "./ClientSearch";
import SendList from "./SendList";
import ShareURL from "./ShareURL";
import { new_list, reset_client, delete_list, new_option, reset_prop_results, reset_prop, load_options } from "../actions/listmaker";
import { reset_list_mode, reset_send_mode, set_list_mode } from "../actions/ui"


function NewList({ new_option, reset_prop_results, property, list, reset_prop, load_options, user, new_list, client, isSendMode, isListMode, delete_list, reset_list_mode, reset_send_mode, set_list_mode, reset_client }) {
    const [showModal, setShowModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [error, setError] = useState(null);

    const handleErrorReset = () => {
        setError(null);
    };
    const handleCreateList = async (e) => {
        if (user !== null && client !== null) { 
            await new_list(user.id, client.id);
            set_list_mode()
        } else {
            setError('client')
        }
    };

    const handlePropertyAdd = async (list, property) => {
        if (property && list) {
            await new_option(property.id, list.id, client.id);
            await reset_prop_results()
            await reset_prop()
            load_options(list.id)
        }
    };

    const handleResetClient = async (list) => {
        if (list && isListMode) {
            const listID = list.id
            await delete_list(listID);
            await reset_list_mode();
            await reset_client();
        }
        setShowResetModal(false);
    };

    const handleOpenURL = () => {
        if (list.uuid) {
            const fullURL = `${window.location.origin}/#/list/${list.uuid}`;
            window.open(fullURL, '_blank');
        }
    };

    const handleEditList = async () => {
        await reset_send_mode();
        set_list_mode()
    }

    const handleOpenResetModal = () => {
        setShowResetModal(true);
    };

    const handleCloseResetModal = () => {
        setShowResetModal(false);
    };

    const handleOpenModal = () => {
        reset_list_mode();
        setShowModal(true);
    }

    const handleCloseModal = async () => {
        reset_list_mode();
        reset_send_mode();
        await reset_client()
        setShowModal(false);
    }

    return (
        <>
            <div className="d-flex justify-content-end align-items-end">
                <Button color="blue" onClick={handleOpenModal} className="button_bg">+</Button>
            </div>
            <div>
                <Modal open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>
                        {isListMode ? (
                            <p>New List: {client.name}</p>
                        ) : isSendMode ? (
                            <p>New List: {client.name}</p>
                        ) : (
                            <p>Create New List</p>
                        )}
                    </Modal.Header>
                    <Modal.Content>
                        <>
                            {isListMode ? (
                                <div className="d-flex flex-column flex-lg-row justify-content-evenly">
                                    <div>
                                        <div className="d-flex flex-column flex-lg-row align-items-center">
                                            <PropertySearch />
                                            <Form onSubmit={() => handlePropertyAdd(list, property)} className="p-3">
                                                <Button className="button_bg" type="submit">ADD PROPERTY</Button>
                                            </Form>
                                        </div>
                                        <Divider />
                                        <OptionList />
                                    </div>
                                    <Divider />
                                    <MapBox />                                                      
                                </div>
                            ) : isSendMode ? (
                                <div className="d-flex justify-content-evenly align-items-center" style={{ height: "500px"}}>
                                    <div className="">
                                       <ShareURL />
                                    </div>
                                    <div className="">
                                        <Form>
                                            <FormField>
                                                <label>Open URL</label>
                                                <Button onClick={handleOpenURL}>
                                                    <i class="linkify icon"></i>
                                                </Button>
                                            </FormField>
                                        </Form>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <Form>
                                            <FormField>
                                                <label>Send Email</label>
                                                <Button>
                                                    <i class="paper plane icon"></i>
                                                </Button>
                                            </FormField>
                                        </Form>
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex flex-column flex-row-lg justify-content-evenly" style={{ height: "500px"}}>
                                    <div className="d-flex flex-column flex-row-lg align-items-center">
                                        <ClientSearch />
                                        <Form onSubmit={handleCreateList} className="p-3">
                                            <Button className="button_bg" type="submit">START LIST</Button>
                                        </Form>
                                    </div>
                                    {error === "client" && (
                                        <div>
                                            <Message negative onDismiss={handleErrorReset}>
                                                <Message.Header>Client Not Added</Message.Header>
                                                <p>Please choose client to start list</p>
                                            </Message>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    </Modal.Content>
                    <Modal.Actions>
                        <div className="d-flex justify-content-between pb-2">
                        <>
                        {isListMode ? (
                            <>
                                <Button onClick={handleOpenResetModal}>BACK</Button>
                                <div>
                                    <ClearOptions />
                                    <SendList />
                                </div>
                            </>
                        ) : isSendMode ? (
                            <>
                                <Button onClick={handleEditList}>BACK</Button>
                                <Button onClick={handleCloseModal}>CLOSE</Button>
                            </>
                        ) : (
                            <Button onClick={handleCloseModal}>CLOSE</Button>
                        )}
                        </>
                        </div>
                    </Modal.Actions>
                </Modal>
            </div>
            <Modal size="tiny" open={showResetModal} onClose={handleCloseResetModal}>
                <Modal.Header>Confirm List Deletion</Modal.Header>
                <Modal.Content>
                    <p>This will delete the current list. Are you sure you want to continue?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={handleCloseResetModal}>
                        CANCEL
                    </Button>
                    <Button positive onClick={() => handleResetClient(list)}>
                        CONFIRM
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.auth.error,
    client: state.listmaker.client,
    isSendMode: state.ui.isSendMode,
    isListMode: state.ui.isListMode,
    list: state.listmaker.list,
    property: state.listmaker.property
});

export default connect(mapStateToProps, { new_option, reset_prop_results, new_list, reset_list_mode, reset_send_mode, delete_list, set_list_mode, reset_client, reset_prop, load_options })(NewList);