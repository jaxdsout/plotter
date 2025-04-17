import { useState } from "react";
import { Link } from "react-router-dom";
import ClientDetail from "./ClientDetail";
import { Modal, Button, Divider, Loader, Dimmer } from "semantic-ui-react";
import { connect } from "react-redux";
import DeleteClient from "./DeleteClient";
import ListDetail from "../lists/ListDetail";
import DealDetail from "../deals/DealDetail"
import { reset_list_mode, reset_deal_mode, reset_edit_list } from "../store/actions/ui";

function AllClients ({ clients, isListMode, isDealMode, reset_list_mode, reset_edit_list, reset_deal_mode, isLoaded }) {
    const [showClientDetail, setShowClientDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDealModal, setShowDealModal] = useState(null);
    const [clientTab, setClientTab] = useState("info");
    const [showListModal, setShowListModal] = useState(null);
    const [selectedList, setSelectedList] = useState(null);
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
        }).replace('', '');
    };

    return (
        <div className="h-[42.3rem] flex flex-col items-between justify-start bg-[#26282B] rounded-lg shadow-md shadow-inner mt-3">
            {isLoaded ? ( 
                <div className="overflow-y-auto h-[40rem] mt-3 pt-5">
                    <div className="flex flex-col items-center overflow-y-auto min-h-[24rem] max-h-full text-left mt-3 mb-10 snap-start">
                        {clients.length > 0 ? (
                            <table className="w-11/12">
                                <thead className="text-gray-500 bg-[#1f2124] text-xs text-center">
                                    <tr>
                                        <th className="p-2 rounded-md">Client</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map((client) => (
                                        <tr
                                            key={client.id}
                                            className="font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#232425] text-center cursor-pointer"
                                            onClick={() => handleOpenModal(client.id)}
                                        >
                                            <td className="p-4 hover:text-[#5F85DB]">{client.first_name} {client.last_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <>
                                <div className='flex flex-col items-center text-white justify-center'>
                                    <Loader inverted active />
                                </div>  
                            </>
                        )} 
                    </div>

                    {clients.map(client => (
                        <>
                            {showClientDetail === client.id && (
                                <Modal className='!w-11/12 sm:!w-[500px]' open={showModal} close onClose={handleCloseModal}>
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
                                                <div className="overflow-y-auto flex justify-center min-h-96">
                                                    {client.lists ? (
                                                        <ul>
                                                            {client.lists.map(list => (
                                                                <li className="mt-2" key={list.id}>
                                                                    <Button onClick={() => handleOpenListModal(list)}>
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
                                            )}
                                            {clientTab === "deals" && (
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
                                            )}
                                        </div>
                                    </Modal.Content>
                                    <Modal.Actions className="flex justify-end">
                                        <Button className="drop-shadow-sm" onClick={handleCloseModal}>CLOSE</Button>
                                    </Modal.Actions>
                                </Modal>
                            )}
                        </>
                    ))}

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
                    </div>
                ) : (
                    <div className='h-[40rem] flex flex-col items-center justify-center mt-3 pt-5'>
                        <Loader inverted active />
                    </div>               
                )
            }   
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    clients: state.agent.clients,
    isListMode: state.ui.isListMode,
    isDealMode: state.ui.isDealMode,
    isLoaded: state.agent.isLoaded
});

export default connect(mapStateToProps, { reset_list_mode, reset_deal_mode, reset_edit_list })(AllClients);