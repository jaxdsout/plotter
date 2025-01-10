import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClientDetail from "./ClientDetail";
import { Modal, Button, Divider, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { load_clients } from "../store/actions/agent";
import DeleteClient from "./DeleteClient";
import ListDetail from "../lists/ListDetail";
import DealDetail from "../deals/DealDetail"
import { reset_list_mode } from "../store/actions/ui";

function AllClients ({ load_clients, clients, user, isListMode, reset_list_mode, }) {
    const [showClientDetail, setShowClientDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [clientTab, setClientTab] = useState("info");
    const [showListModal, setShowListModal] = useState(null);
    const [selectedList, setSelectedList] = useState(null);
    const [showDealModal, setShowDealModal] = useState(null);
    const [selectedDeal, setSelectedDeal] = useState(null);

    const handleOpenModal = (id) => {
        setShowClientDetail(showClientDetail === id ? null : id)
        setShowModal(true);
        setClientTab("info");
    };

    const handleCloseModal = () => setShowModal(false);

    const handleTabChange = (tab) => {
        setClientTab(tab);
    };

    const handleOpenListModal = (list) => {
        setSelectedList(list);
        setShowListModal(true);
    };
    
    const handleCloseListModal = () => {
        setShowListModal(false);
        setSelectedList(null);
        reset_list_mode();
    };

    const handleOpenDealModal = (deal) => {
        setSelectedDeal(deal);
        setShowDealModal(true);
    };
    
    const handleCloseDealModal = () => {
        setShowDealModal(false);
        setSelectedDeal(null);
    };

    const handleCancelEdit = async () => {
        reset_list_mode();
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

    useEffect(() => {
        if (user){
            load_clients(user.id);
        }
        console.log("all_clients useffect")
    }, [load_clients, user])


    return (
        <>
            <div className="overflow-y-auto h-[40rem] mt-3 pt-5">
                {clients.length > 0 ? ( 
                <ul className='divide-y divide-gray-200 border border-gray-300 rounded-md'>
                    {clients.map(client => (
                        <li 
                            className='p-3 flex flex-row justify-evenly items-start font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#232425]' 
                            key={client.id}
                        >
                            <Link onClick={() => handleOpenModal(client.id)}>
                                {client.first_name} {client.last_name}
                            </Link>
                            {showClientDetail === client.id && (
                            <Modal className='!w-11/12 sm:!w-[500px]' open={showModal} onClose={handleCloseModal}>
                                <Modal.Header>Client Details</Modal.Header>
                                <Modal.Content>
                                    <div className="flex pt-1 justify-between">
                                        <div>
                                            <Button color="blue" onClick={() => handleTabChange("info")} className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold drop-shadow-sm">INFO</Button>
                                            <Button color="blue" onClick={() => handleTabChange("lists")} className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold drop-shadow-sm">LISTS</Button>
                                            <Button color="blue" onClick={() => handleTabChange("deals")} className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold drop-shadow-sm">DEALS</Button>
                                        </div>
                                        <div className="text-center">
                                            <DeleteClient client={client} handleCloseModal={handleCloseModal}/>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div>
                                        {clientTab === "info" && (
                                            <ClientDetail client={client} />
                                        )}
                                        {clientTab === "lists" && (
                                            <>
                                                <div className="overflow-y-auto flex justify-center min-h-96">
                                                    {client.lists.length > 0 ? (
                                                        <ul>
                                                            {client.lists.map(list => (
                                                                <li className="mt-2" key={list.id}>
                                                                    <Button 
                                                                        onClick={() => handleOpenListModal(list)}>
                                                                            {formatDate(list.date)}
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <div className="text-center">
                                                            <Loader />
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        {clientTab === "deals" && (
                                            <>
                                                <div className="overflow-y-auto flex justify-center min-h-96">
                                                    {client.deals.length > 0 ? (
                                                        <ul>
                                                            {client.deals.map(deal => (
                                                                <li className="mt-2" key={deal.id}>
                                                                    <Button 
                                                                        onClick={() => handleOpenDealModal(deal)}>
                                                                            {deal.prop_name} {deal.move_date}
                                                                        </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                ) : (
                                                    <div className="text-center">
                                                        <Loader />
                                                    </div>
                                                )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </Modal.Content>
                                <Modal.Actions className="flex justify-end">
                                    <Button className="drop-shadow-sm" onClick={handleCloseModal}>CLOSE</Button>
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
                )
            }
            </div>
            {showListModal && selectedList && (
                <Modal className="!w-11/12 sm:!w-[500px]" open={showListModal} onClose={handleCloseListModal}>
                    <Modal.Header>List Details</Modal.Header>
                    <Modal.Content>
                        <ListDetail list={selectedList} />
                    </Modal.Content>
                    <Modal.Actions className="flex justify-end">
                        {isListMode ? (
                            <Button onClick={handleCancelEdit}>CANCEL</Button>
                        ) : (
                            <Button onClick={handleCloseModal}>CLOSE</Button>
                        )}
                    </Modal.Actions>
                </Modal>
            )}
            {showDealModal && selectedDeal && (
                <Modal className="!w-11/12 sm:!w-[500px]" open={showDealModal} onClose={handleCloseDealModal}>
                    <Modal.Header>Deal Details</Modal.Header>
                    <Modal.Content>
                        <DealDetail deal={selectedDeal} />
                    </Modal.Content>
                    <Modal.Actions className="flex justify-end">
                        <Button className="drop-shadow-sm" onClick={handleCloseDealModal}>CLOSE</Button>
                    </Modal.Actions>
                </Modal>
            )}
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    clients: state.agent.clients,
    user: state.auth.user,
    isListMode: state.ui.isListMode
});

export default connect(mapStateToProps, { load_clients, reset_list_mode })(AllClients);