import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClientDetail from "./ClientDetail";
import { Modal, Button, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { load_clients } from "../actions/agent";
import DeleteClient from "./DeleteClient";

function AllClients ({ load_clients, clients, user }) {
    const [showClientDetail, setShowClientDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [clientTab, setClientTab] = useState("info");

    const handleOpenModal = (id) => {
        setShowClientDetail(showClientDetail === id ? null : id)
        setShowModal(true);
        setClientTab("info");
    };

    const handleCloseModal = () => setShowModal(false);

    const handleTabChange = (tab) => {
        setClientTab(tab);
    };

    useEffect(() => {
        if (user){
            load_clients(user.id);
        }
    }, [load_clients, user])


    return (
        <>
            <h6 className="noto-sans"> all clients </h6>
            <div className="overflow-y-auto plotterbox">
                {clients.length > 0 ? ( 
                <ul class="list-group">
                    {clients.map(client => (
                        <li class="list-group-item" key={client.id}>
                        <Link onClick={() => handleOpenModal(client.id)}>
                            {client.first_name} {client.last_name}
                        </Link>
                        {showClientDetail === client.id && (
                            <Modal className='' open={showModal} onClose={handleCloseModal}>
                                <Modal.Header>Client Details</Modal.Header>
                                <Modal.Content>
                                    <div className="d-flex pt-1 justify-content-between">
                                        <div>
                                            <Button color="blue" onClick={() => handleTabChange("info")}>INFO</Button>
                                            <Button color="blue" onClick={() => handleTabChange("lists")}>LISTS</Button>
                                            <Button color="blue" onClick={() => handleTabChange("deals")}>DEALS</Button>
                                        </div>
                                        <div>
                                            <DeleteClient client={client} handleCloseModal={handleCloseModal}/>
                                        </div>
                                    </div>
                                    <Divider />
                                    <>
                                            {clientTab === "info" && (
                                                <ClientDetail client={client} />
                                            )}
                                            {clientTab === "lists" && (
                                                client.lists.length > 0 ? (
                                                    <div className="overflow-y-scroll" style={{ height: '250px' }}>
                                                    <ul>
                                                        {client.lists.map(list => (
                                                            <li key={list.id}>{list.date}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                ) : (
                                                    <p>No lists yet for client.</p>
                                                )
                                            )}
                                            {clientTab === "deals" && (
                                                client.deals.length > 0 ? (
                                                    <div className="overflow-y-scroll" style={{ height: '250px' }}>
                                                        <ul>
                                                            {client.deals.map(deal => (
                                                                <li key={deal.id}>{deal.prop_name} {deal.move_date}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <div className="text-center">
                                                        <p>No deals to load.</p>
                                                    </div>
                                                )
                                            )}
                                    </>
                                </Modal.Content>
                                <Modal.Actions className="d-flex">
                                    <Button onClick={handleCloseModal}>CLOSE</Button>
                                </Modal.Actions>
                            </Modal>
                        )}
                        </li>
                    ))}
                </ul>
                ) : (
                    <div className="text-center">
                        <p>Loading clients..</p>
                    </div>
                )
            }
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    clients: state.agent.clients,
    user: state.auth.user,
});

export default connect(mapStateToProps, { load_clients })(AllClients);