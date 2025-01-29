import { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Divider, Message } from "semantic-ui-react";
import MapBox from "./MapBox";
import PropertySearch from "./PropertySearch";
import OptionList from "./OptionList";
import ClearOptions from "./ClearOptions";
import ClientSearch from "./ClientSearch";
import SendList from "./SendList";
import ShareURL from "./ShareURL";
import ReorderList from "./ReorderList";
import { new_list, delete_list, new_option, load_list } from "../store/actions/listmaker";
import { reset_list_mode, reset_send_mode, set_list_mode, reset_reorder_mode } from "../store/actions/ui"
import { load_lists } from "../store/actions/agent";


function NewList({ new_option, reset_reorder_mode, property, list, load_list, load_lists, user, new_list, client, isSendMode, isListMode, isReorderMode, delete_list, reset_list_mode, reset_send_mode, set_list_mode }) {
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
            await load_list(list.id);
        }
    };

    const handleResetClient = async (list) => {
        if (list && isListMode) {
            const listID = list.id
            await delete_list(listID);
            await reset_list_mode();
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
        await reset_list_mode();
        await load_lists(user.id);
        reset_send_mode();
        reset_reorder_mode();
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
                            <p>New List: {client?.name}</p>
                        ) : isSendMode ? (
                            <p>Send List: {client?.name}</p>
                        ) : (
                            <p>Create New List</p>
                        )}
                    </Modal.Header>
                    <Modal.Content>
                        <>
                            {isListMode ? (
                                <div className="flex flex-col md:flex-row justify-evenly items-center md:items-start">
                                    <div className="flex flex-col justify-start pb-5">
                                        <div className="flex flex-row items-center justify-between">
                                            <PropertySearch/>
                                            <div className="!ml-2">
                                                <Button 
                                                    className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !text-xs" 
                                                    onClick={() => handlePropertyAdd(list, property)}
                                                >
                                                    ADD PROPERTY
                                                </Button>
                                            </div>
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
                            <div className="flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start pb-5">
                                <div>
                                    <Button size='tiny' className="drop-shadow-sm" onClick={handleOpenResetModal}>BACK</Button>
                                </div>
                                <div className="flex flex-row">
                                    {isReorderMode ? (
                                        <>
                                            <ReorderList />
                                        </>
                                    ) : (
                                        <div className="flex flex-row mb-6 sm:mb-0">
                                            <ReorderList />
                                            <ClearOptions />
                                            <SendList />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : isSendMode ? (
                            <div className="flex justify-between pb-5">
                                <Button size='tiny' className="drop-shadow-sm" onClick={handleEditList}>BACK</Button>
                                <Button size='tiny' className="drop-shadow-sm" color="green" onClick={handleCloseModal}>DONE</Button>
                            </div>
                        ) : (
                            <div className="flex justify-end pb-5">
                            <Button size='tiny' className="drop-shadow-sm" onClick={handleCloseModal}>CLOSE</Button>
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
    user: state.auth.user,
    error: state.auth.error,
    client: state.listmaker.client,
    isSendMode: state.ui.isSendMode,
    isListMode: state.ui.isListMode,
    list: state.listmaker.list,
    property: state.listmaker.property,
    isReorderMode: state.ui.isReorderMode
});

export default connect(mapStateToProps, { new_option, reset_reorder_mode, new_list, reset_list_mode, reset_send_mode, delete_list, set_list_mode, load_list, load_lists })(NewList);