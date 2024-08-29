
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClientDetail from "./ClientDetail";
import { Modal, Button, Divider } from "semantic-ui-react";


function AllClients ({ all_clients, clients }) {
    const [showClientDetail, setShowClientDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (id) => {
        setShowClientDetail(showClientDetail === id ? null : id)
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        console.log("firing all clients")
        all_clients();
    }, [])

    return (
        <>
            <ul class="list-group">
                {clients.map(client => (
                    <li class="list-group-item" key={client.id}>
                    <Link onClick={() => handleOpenModal(client.id)}>
                        {client.first_name} {client.last_name}
                    </Link>
                    {showClientDetail === client.id && (
                        <Modal className='' open={showModal} onClose={handleCloseModal}>
                            <Modal.Header>Client Info</Modal.Header>
                            <Modal.Content>
                                <>
                                    <ClientDetail client={client} />
                                </>
                                <Divider />
                                <div className="pt-1">
                                    <Button>LISTS</Button>
                                    <Button>DEALS</Button>
                                </div>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={handleCloseModal}>CLOSE</Button>
                            </Modal.Actions>
                        </Modal>
                    )}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default AllClients