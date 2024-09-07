
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClientDetail from "./ClientDetail";
import { Modal, Button, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { load_clients } from "../actions/agent";

function AllClients ({ load_clients, clients, user, }) {
    const [showClientDetail, setShowClientDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (id) => {
        setShowClientDetail(showClientDetail === id ? null : id)
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        load_clients(user.id);
    }, [load_clients, user])

    return (
        <>
            <h6 className="noto-sans"> all clients </h6>
            <div className="overflow-y-auto plotterbox">
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
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    clients: state.agent.clients,
    user: state.auth.user
});

export default connect(mapStateToProps, { load_clients })(AllClients);