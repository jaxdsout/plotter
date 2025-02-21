
import { useState } from "react";
import { Link } from "react-router-dom";
import DealDetail from "./DealDetail";
import { Modal, Button, Loader, Dimmer } from "semantic-ui-react";
import { connect } from "react-redux";
import { reset_deal_mode } from "../store/actions/ui";
import { load_deal } from "../store/actions/agent";

function AllDeals ({ deals, isDealMode, reset_deal_mode, isLoaded }) {
    const [selectedDealID, setSelectedDealID] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (id) => {
        setSelectedDealID(selectedDealID === id ? null : id)
        setShowModal(true);
    };

    const handleCloseModal = async () => {
        await reset_deal_mode();
        setShowModal(false);
    }

    const handleCancelEdit = async (deal) => {
        load_deal(deal.id);
        await reset_deal_mode();
    }

    return (
        <div className="h-[43.3rem] flex flex-col items-between justify-start bg-[#26282B] rounded-lg shadow-md shadow-inner">
            {isLoaded ? ( 
                <div className="overflow-y-auto h-[40rem] mt-3 pt-5">
                    <div className="flex flex-col items-center overflow-y-auto min-h-[24rem] max-h-full text-left mt-3 mb-10 snap-start">
                            {deals.length > 0 ? (
                            <>
                                <table className="w-11/12">
                                    <thead className="text-gray-500 bg-[#1f2124] text-xs text-center">
                                        <tr className="">
                                            <th className="p-2 rounded-tl-md rounded-bl-md">Client</th>
                                            <th className="p-2">Property</th>
                                            <th className="p-2 ounded-tr-md rounded-br-md">Date Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deals.map((deal) => (
                                            <tr
                                                key={deal.id}
                                                className="font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#232425] text-center cursor-pointer"
                                                onClick={() => handleOpenModal(deal.id)}
                                            >
                                                <td className="p-2 hover:text-[#5F85DB]">{deal.client_name}</td>
                                                <td className="p-2 hover:text-[#5F85DB]">{deal.prop_name}</td>
                                                <td className="p-2 hover:text-[#5F85DB]">{deal.deal_date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            {selectedDealID && (
                                <Modal className='!w-11/12 sm:!w-[500px] !mb-10' open={showModal} onClose={handleCloseModal}>
                                    <Modal.Header>List Info</Modal.Header>
                                    <Modal.Content>
                                        <DealDetail dealID={selectedDealID} handleCloseModal={handleCloseModal}/>
                                    </Modal.Content>
                                    <Modal.Actions className="flex justify-end">
                                        {isDealMode ? (
                                            <Button onClick={(() => handleCancelEdit(selectedDealID))}>CANCEL</Button>
                                        ): (
                                            <Button onClick={handleCloseModal}>CLOSE</Button>
                                        )}  
                                    </Modal.Actions>
                                </Modal>
                            )}
                        </>
                    ) : (
                        <>
                            <div className='flex flex-col items-center text-white justify-center'>
                            <p>There are currently no lists to display. Use the button above to get started.</p>                            
                            </div>  
                        </>
                    )} 
                </div>

                </div>
            ) : (
                <div className='h-[40rem] flex flex-col items-center justify-center mt-3 pt-5'>
                    <Loader inverted active />
                </div>
                
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    deals: state.agent.deals,
    user: state.auth.user,
    isDealMode: state.ui.isDealMode,
    isLoaded: state.agent.isLoaded
});

export default connect(mapStateToProps, { reset_deal_mode })(AllDeals);