
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClientDetail from "./ClientDetail";
import { Modal, Button } from "semantic-ui-react";


function AllClients ({ all_clients, clients }) {
    const [showClientDetail, setShowClientDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        all_clients();
    }, [])

    const handleOpenModal = (id) => {
        setShowClientDetail(showClientDetail === id ? null : id)
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);


    return (
        <div className="container bg-dark-subtle">
            <ul class="list-group">
                {clients.map(client => (
                    <li class="list-group-item" key={client.id}>
                    <Link onClick={() => handleOpenModal(client.id)}>
                        {client.first_name} {client.last_name}
                    </Link>
                    {showClientDetail === client.id && (
                        <Modal open={showModal} onClose={handleCloseModal}>
                            <Modal.Header>Client Info</Modal.Header>
                            <Modal.Content>
                                <ClientDetail client={client} />
                                <div>
                                    <button>
                                        lists 
                                    </button>
                                    <button>
                                        deals
                                    </button>
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
        </div>
    )
}

export default AllClients