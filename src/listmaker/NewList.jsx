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
import ReorderList from "./ReorderList";
import { new_list, reset_client, delete_list, new_option, reset_prop_results, reset_prop, load_options } from "../actions/listmaker";
import { reset_list_mode, reset_send_mode, set_list_mode, reset_reorder_mode } from "../actions/ui"


function NewList({ new_option, reset_prop_results, reset_reorder_mode, property, list, reset_prop, load_options, user, new_list, client, isSendMode, isListMode, delete_list, reset_list_mode, reset_send_mode, set_list_mode, reset_client, isReorderMode, set_reorder_mode }) {
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
        reset_reorder_mode();
        await reset_client()
        setShowModal(false);
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <Button color="blue" onClick={handleOpenModal} className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold">+</Button>
            </div>
            <div>
                <Modal className='!w-11/12 md:!w-[800px]' open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>
                        {isListMode ? (
                            <p>New List: {client.name}</p>
                        ) : isSendMode ? (
                            <p>Send List: {client.name}</p>
                        ) : (
                            <p>Create New List</p>
                        )}
                    </Modal.Header>
                    <Modal.Content>
                        <>
                            {isListMode ? (
                                <div className="flex flex-col sm:flex-row justify-evenly items-center md:items-start">
                                    <div className="flex flex-col justify-start pb-5">
                                        <div className="flex flex-row items-center">
                                            <PropertySearch/>
                                            <Form onSubmit={() => handlePropertyAdd(list, property)} className="p-3">
                                                <Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !text-xs" type="submit">ADD PROPERTY</Button>
                                            </Form>
                                        </div>
                                        <Divider />
                                        <OptionList />
                                    </div>
                                    <div className="flex justify-center items-center pb-5">
                                        <MapBox />                                                      
                                    </div>
                                </div>
                            ) : isSendMode ? (
                                <div className="flex flex-row justify-center items-center h-[20rem]">
                                       <ShareURL />
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center h-[20rem]">
                                    <div className="flex flex-col lg:flex-row items-center justify-between">
                                        <ClientSearch />
                                        <Form onSubmit={handleCreateList} className="p-3">
                                            <Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold drop-shadow" type="submit">
                                                START LIST
                                            </Button>
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
                        <>
                        {isListMode ? (
                            <div className="flex justify-between items-center pb-5">
                                <Button className="drop-shadow-sm" onClick={handleOpenResetModal}>BACK</Button>
                                <div className="flex">
                                    <ReorderList />
                                    <ClearOptions />
                                    <SendList />
                                </div>
                            
                            </div>
                        ) : isSendMode ? (
                            <div className="flex justify-between pb-5">
                                <Button className="drop-shadow-sm" onClick={handleEditList}>BACK</Button>
                                <Button className="drop-shadow-sm" color="green" onClick={handleCloseModal}>DONE</Button>
                            </div>
                        ) : (
                            <div className="flex justify-end pb-5">
                            <Button className="drop-shadow-sm" onClick={handleCloseModal}>CLOSE</Button>
                            </div>
                        )}
                        </>
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
    property: state.listmaker.property,
    isReorderMode: state.ui.isReorderMode
});

export default connect(mapStateToProps, { new_option, reset_prop_results, reset_reorder_mode, new_list, reset_list_mode, reset_send_mode, delete_list, set_list_mode, reset_client, reset_prop, load_options })(NewList);