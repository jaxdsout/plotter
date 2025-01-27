import { useState } from "react";
import { Link } from "react-router-dom";
import ClientDetail from "./ClientDetail";
import { Modal, Button, Divider, Loader, Dimmer } from "semantic-ui-react";
import { connect } from "react-redux";
import DeleteClient from "./DeleteClient";
import ListDetail from "../lists/ListDetail";
import DealDetail from "../deals/DealDetail"
import { reset_list_mode, reset_deal_mode, reset_edit_list } from "../store/actions/ui";

function AllClients ({ clients, isListMode, isDealMode, reset_list_mode, reset_edit_list, reset_deal_mode}) {
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

    const handleCloseModal = async () => {
        setShowModal(false);
        await reset_edit_list();
    }

    const handleTabChange = (tab) => {
        setClientTab(tab);
    };


    const handleOpenListModal = (list) => {
        setSelectedList(list.id);
        setShowListModal(true);
    };

    const handleCloseListModal = () => {
        setShowListModal(false);
        setSelectedList(null);
        reset_list_mode();
    };


    const handleOpenDealModal = (deal) => {
        setSelectedDeal(deal.id);
        setShowDealModal(true);
    };
    
    const handleCloseDealModal = () => {
        setShowDealModal(false);
        setSelectedDeal(null);
    };


    const handleCancelEdit = async () => {
        reset_list_mode();
        reset_deal_mode();
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
                {clients ? ( 
                    <>
                        <ul className='divide-y divide-gray-200 border border-gray-300 rounded-md'>
                            {clients.map(client => (
                                <li key={client.id} className='p-3 flex flex-row justify-evenly items-start font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#232425]' >
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
                                                                {client.lists ? (
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
                                                                    <>
                                                                        <Dimmer active>
                                                                            <Loader />
                                                                        </Dimmer>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                    {clientTab === "deals" && (
                                                        <>
                                                            <div className="overflow-y-auto flex justify-center min-h-96">
                                                                {client.deals ? (
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
                                                                    <>
                                                                        <Dimmer active>
                                                                            <Loader />
                                                                        </Dimmer>
                                                                    </>
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
                    </>
                ) : (
                    <>
                        <Dimmer active>
                            <Loader />
                        </Dimmer>
                    </>
                )
            }
            </div>


            {showListModal && selectedList && (
                <Modal className="!w-11/12 sm:!w-[500px]" open={showListModal} onClose={handleCloseListModal}>
                    <Modal.Header>List Details</Modal.Header>
                    <Modal.Content>
                        <ListDetail listID={selectedList} handleCloseModal={handleCloseListModal}/>
                    </Modal.Content>
                    <Modal.Actions className="flex justify-end">
                        {isListMode ? (
                            <Button onClick={handleCancelEdit}>CANCEL</Button>
                        ) : (
                            <Button onClick={handleCloseListModal}>CLOSE</Button>
                        )}
                    </Modal.Actions>
                </Modal>
            )}


            {showDealModal && selectedDeal && (
                <Modal className="!w-11/12 sm:!w-[500px]" open={showDealModal} onClose={handleCloseDealModal}>
                    <Modal.Header>Deal Details</Modal.Header>
                    <Modal.Content>
                        <DealDetail dealID={selectedDeal} handleCloseModal={handleCloseDealModal}/>
                    </Modal.Content>
                    <Modal.Actions className="flex justify-end">
                        {isDealMode ? (
                            <Button onClick={handleCancelEdit}>CANCEL</Button>
                        ) : (
                            <Button onClick={handleCloseDealModal}>CLOSE</Button>
                        )}
                    </Modal.Actions>
                </Modal>
            )}
        </>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    clients: state.agent.clients,
    isListMode: state.ui.isListMode,
    isDealMode: state.ui.isDealMode
});

export default connect(mapStateToProps, { reset_list_mode, reset_deal_mode, reset_edit_list })(AllClients);