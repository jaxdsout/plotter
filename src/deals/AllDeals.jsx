
import { useState } from "react";
import { Link } from "react-router-dom";
import DealDetail from "./DealDetail";
import { Modal, Button, Loader, Dimmer } from "semantic-ui-react";
import { connect } from "react-redux";
import { reset_deal_mode } from "../store/actions/ui";
import { load_deal } from "../store/actions/agent";

function AllDeals ({ deals, isDealMode, reset_deal_mode }) {
    const [showDealDetail, setShowDealDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (id) => {
        setShowDealDetail(showDealDetail === id ? null : id)
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
        <>
            <div className="overflow-y-auto h-[40rem] mt-3 pt-5">
                {deals ? ( 
                    <>
                    {deals.length > 0 ? (
                        <>
                            <ul className='divide-y divide-gray-200 border border-gray-300 rounded-md'>
                                {deals?.map(deal => (
                                    <li className='p-3 flex flex-row justify-evenly items-start font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#232425]' key={deal.id}>
                                        <div className="flex justify-between">
                                            <Link onClick={() => handleOpenModal(deal.id)}>
                                                <span>
                                                    <b>{deal.client_name}</b> | {deal.prop_name} | Move-in Date: {deal.move_date}
                                                </span>
                                            </Link>
                                        </div>
                                        {showDealDetail === deal.id && (
                                            <Modal className='!w-10/12 sm:!w-[500px]' open={showModal} onClose={handleCloseModal}>
                                                <Modal.Header>
                                                    {isDealMode ? (
                                                        <span>Edit Deal</span>
                                                    ) :(
                                                        <span>Deal Info</span>
                                                    )}
                                                </Modal.Header>
                                                <Modal.Content>
                                                    <DealDetail dealID={deal.id} handleCloseModal={handleCloseModal}/>
                                                </Modal.Content>
                                                <Modal.Actions className="flex justify-end">
                                                    {isDealMode ? (
                                                        <Button onClick={(() => handleCancelEdit(deal))}>CANCEL</Button>
                                                    ): (
                                                        <Button onClick={handleCloseModal}>CLOSE</Button>
                                                    )}                                            
                                                </Modal.Actions>
                                            </Modal>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col justify-center items-center text-white font-semi">
                                <p>There are currently no deals to display. Use the button above to get started.</p>
                            </div>
                        </>
                    )}
                    </>
                ) : (
                    <>
                        <Dimmer active>
                            <Loader />
                        </Dimmer>
                    </>
                )}
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    deals: state.agent.deals,
    user: state.auth.user,
    isDealMode: state.ui.isDealMode
});

export default connect(mapStateToProps, { reset_deal_mode })(AllDeals);