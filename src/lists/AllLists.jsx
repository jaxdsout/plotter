
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "semantic-ui-react";
import ListDetail from "./ListDetail";
import { load_lists } from "../actions/agent";
import { connect } from "react-redux";

function AllLists ({ load_lists, lists }) {
    const [showListDetail, setShowListDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        console.log("firing all lists")
        load_lists();
    }, [])
    

    const handleOpenModal = (id) => {
        setShowListDetail(showListDetail === id ? null : id)
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

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
            <h6 className="noto-sans"> all lists </h6>
            <div className="overflow-y-auto plotterbox">
                <ul class="list-group hover">
                    {lists.map(list => (
                        <li class="list-group-item" key={list.id}>
                            <div className="d-flex justify-content-between">
                                <span>{list.client_name} - {formatDate(list.date)}</span>
                                <Link onClick={() => handleOpenModal(list.id)}>
                                    View Details
                                </Link>
                            </div>                 
                        {showListDetail === list.id && (
                            <Modal open={showModal} onClose={handleCloseModal}>
                                <Modal.Header>List Info</Modal.Header>
                                <Modal.Content>
                                    <ListDetail list={list} />
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button onClick={handleCloseModal}>CLOSE</Button>
                                </Modal.Actions>
                            </Modal>
                        )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.auth.error,
    lists: state.agent.lists
});

export default connect(mapStateToProps, { load_lists })(AllLists);