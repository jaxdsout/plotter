
import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Loader, Dimmer } from "semantic-ui-react";
import ListDetail from "./ListDetail";
import { connect } from "react-redux";
import { reset_list_mode } from "../store/actions/ui";
import { load_list } from "../store/actions/listmaker";


function AllLists ({ lists, reset_list_mode, isListMode, load_list }) {
    const [showListDetail, setShowListDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);
    

    const handleOpenModal = (id) => {
        setShowListDetail(showListDetail === id ? null : id)
        setShowModal(true);
    };

    const handleCloseModal = async () => {
        await reset_list_mode();
        setShowModal(false);
    }

    const handleCancelEdit = async (list) => {
        load_list(list.id);
        await reset_list_mode();
    }

    const formatDate = (datetimeStr) => {
        const dateObj = new Date(datetimeStr);
        return dateObj.toLocaleString('default', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).replace(',', '');
    };

    return (
        <>
            <div className="overflow-y-auto h-[40rem] mt-3 pt-5">
                {lists ? ( 
                    <>
                        {lists.length > 0 ? (
                            <>
                                <ul className='divide-y divide-gray-200 border border-gray-300 rounded-md'>
                                    {lists?.map(list => (
                                        <li className='p-3 flex flex-row justify-evenly items-start text-white hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#232425]' key={list.id}>
                                            <div className="flex justify-between">
                                                <Link onClick={() => handleOpenModal(list.id)}>
                                                    <span className="font-bold">{list.client_name}</span> | <span>{formatDate(list.date)}</span>
                                                </Link>
                                            </div>                 
                                            {showListDetail === list.id && (
                                                <Modal className='!w-11/12 sm:!w-[500px] !mb-10' open={showModal} onClose={handleCloseModal}>
                                                    <Modal.Header>List Info</Modal.Header>
                                                    <Modal.Content>
                                                        <ListDetail listID={list.id} handleCloseModal={handleCloseModal}/>
                                                    </Modal.Content>
                                                    <Modal.Actions className="flex justify-end">
                                                        {isListMode ? (
                                                            <Button onClick={(() => handleCancelEdit(list))}>CANCEL</Button>
                                                        ): (
                                                            <Button onClick={handleCloseModal}>CLOSE</Button>
                                                        )}
                                                    </Modal.Actions>
                                                </Modal>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col justify-center items-center text-white font-semi">
                                    <p>There are currently no lists to display. Use the button above to get started.</p>
                                </div>
                            </>
                        )}

                        
                    </>
                ) : (
                    <>
                        <Dimmer active>
                            <Loader />
                        </Dimmer>
                    </>
                )}
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    lists: state.agent.lists,
    isListMode: state.ui.isListMode
});

export default connect(mapStateToProps, { reset_list_mode, load_list })(AllLists);