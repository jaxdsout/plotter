
import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Loader, Dimmer } from "semantic-ui-react";
import ListDetail from "./ListDetail";
import { connect } from "react-redux";
import { reset_list_mode } from "../store/actions/ui";
import { load_list } from "../store/actions/listmaker";


function AllLists ({ lists, reset_list_mode, isListMode, load_list, isLoaded }) {
    const [selectedListID, setSelectedListID] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const handleOpenModal = (id) => {
        setSelectedListID(selectedListID === id ? null : id)
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
        const dateObj = new Date(datetimeStr );
        return dateObj.toLocaleString('default', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <div className="h-[43.3rem] flex flex-col items-between justify-start bg-[#26282B] rounded-lg shadow-md shadow-inner">
            {isLoaded ? ( 
                <div className="overflow-y-auto h-[40rem] mt-3 pt-5">
                    <div className="flex flex-col items-center overflow-y-auto min-h-[24rem] max-h-full text-left mt-3 mb-10 snap-start">
                            {lists.length > 0 ? (
                            <>
                                <table className="w-11/12">
                                    <thead className="text-gray-500 bg-[#1f2124] text-xs text-center">
                                        <tr className="rounded-md">
                                            <th className="p-2 rounded-tl-md rounded-bl-md">Client</th>
                                            <th className="p-2 rounded-tr-md rounded-br-md">Date Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lists.map((list) => (
                                            <tr
                                                key={list.id}
                                                className="font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#232425] text-center cursor-pointer"
                                                onClick={() => handleOpenModal(list.id)}
                                            >
                                                <td className="p-2 hover:text-[#5F85DB]">{list.client_name}</td>
                                                <td className="p-2 hover:text-[#5F85DB]">{formatDate(list.date)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            {selectedListID && (
                                <Modal className='!w-11/12 sm:!w-[500px] !mb-10' open={showModal} onClose={handleCloseModal}>
                                    <Modal.Header>List Info</Modal.Header>
                                    <Modal.Content>
                                        <ListDetail listID={selectedListID} handleCloseModal={handleCloseModal}/>
                                    </Modal.Content>
                                    <Modal.Actions className="flex justify-end">
                                        {isListMode ? (
                                            <Button onClick={(() => handleCancelEdit(selectedListID))}>CANCEL</Button>
                                        ): (
                                            <Button onClick={handleCloseModal}>CLOSE</Button>
                                        )}
                                    </Modal.Actions>
                                </Modal>
                            )}
                        </>
                        ) : (
                            <>
                                <div className='flex flex-col items-center text-white justify-center'>
                                    <p>There are currently no lists to display. Use the button above to get started.</p>                            
                                </div>  
                            </>
                        )} 
                    </div>

                </div>
            ) : (
                <div className='h-[40rem] flex flex-col items-center justify-center mt-3 pt-5'>
                    <Loader inverted active />
                </div>
                
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    lists: state.agent.lists,
    isListMode: state.ui.isListMode,
    isLoaded: state.agent.isLoaded
});

export default connect(mapStateToProps, { reset_list_mode, load_list })(AllLists);