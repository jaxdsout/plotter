
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "semantic-ui-react";


function AllLists ({ all_lists, lists }) {
    const [showListDetail, setShowListDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        all_lists();
    }, [])

    const handleOpenModal = (id) => {
        setShowListDetail(showListDetail === id ? null : id)
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);


    return (
        <div className="container bg-dark-subtle">
            <ul class="list-group">
                {lists.map(list => (
                    <li class="list-group-item" key={list.id}>
                    <Link onClick={() => handleOpenModal(list.id)}>
                        {list.first_name} {list.last_name}
                    </Link>
                    {showListDetail === list.id && (
                        <Modal open={showModal} onClose={handleCloseModal}>
                            <Modal.Header>List Info</Modal.Header>
                            <Modal.Content>
                                {/* <ListDetail list={list} /> */}
                                <p>List stuff will go here eventually</p>
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
    )
}

export default AllLists