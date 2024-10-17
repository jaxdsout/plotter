
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "semantic-ui-react";
import ListDetail from "./ListDetail";
import { load_lists } from "../actions/agent";
import { connect } from "react-redux";
import { reset_list_mode, reset_send_mode } from "../actions/ui";


function AllLists ({ user, load_lists, lists, reset_list_mode, reset_send_mode, isListMode }) {
    const [showListDetail, setShowListDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (user){
            load_lists(user.id);
        }
        console.log("all_lists useffect")
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
            <div className="overflow-y-auto plotterbox mt-3">
                {lists.length > 0 ? ( 
                <ul class="list-group hover">
                    {lists.map(list => (
                        <li class="list-group-item" key={list.id}>
                            <div className="d-flex justify-content-between">
                                <span>{list.client_name} - {formatDate(list.date)}</span>
                                <Link onClick={() => handleOpenModal(list.id)}>
                                    <i class="ellipsis horizontal icon"></i>
                                </Link>
                            </div>                 
                        {showListDetail === list.id && (
                            <Modal open={showModal} onClose={handleCloseModal}>
                                <Modal.Header>List Info</Modal.Header>
                                <Modal.Content>
                                    <ListDetail list={list} handleCloseModal={handleCloseModal}/>
                                </Modal.Content>
                                <Modal.Actions className="d-flex">
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
                    <div className="text-center">
                        <p>No lists to display.</p>
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