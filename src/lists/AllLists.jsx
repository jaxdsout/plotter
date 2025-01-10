
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Loader } from "semantic-ui-react";
import ListDetail from "./ListDetail";
import { load_lists } from "../store/actions/agent";
import { connect } from "react-redux";
import { reset_list_mode, reset_send_mode } from "../store/actions/ui";


function AllLists ({ user, load_lists, lists, reset_list_mode, reset_send_mode, isListMode }) {
    const [showListDetail, setShowListDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (user){
            load_lists(user.id);
        }
    }, [load_lists, user])
    

    const handleOpenModal = (id) => {
        setShowListDetail(showListDetail === id ? null : id)
        setShowModal(true);
    };

    const handleCloseModal = async () => {
        await reset_list_mode();
        await reset_send_mode();
        setShowModal(false);
    }

    const handleCancelEdit = async () => {
        await reset_list_mode();
        await reset_send_mode();
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
                {lists.length > 0 ? ( 
                <ul className='divide-y divide-gray-200 border border-gray-300 rounded-md'>
                    {lists.map(list => (
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
                                    <ListDetail list={list} handleCloseModal={handleCloseModal}/>
                                </Modal.Content>
                                <Modal.Actions className="flex justify-end">
                                    {isListMode ? (
                                        <Button onClick={handleCancelEdit}>CANCEL</Button>
                                    ): (
                                        <Button onClick={handleCloseModal}>CLOSE</Button>
                                    )}
                                </Modal.Actions>
                            </Modal>
                        )}
                        </li>
                    ))}
                </ul>
                ) : (
                    <div className="text-center text-white">
                        <Loader />
                    </div>
                )}
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.auth.error,
    lists: state.agent.lists,
    isListMode: state.ui.isListMode
});

export default connect(mapStateToProps, { load_lists, reset_list_mode, reset_send_mode })(AllLists);