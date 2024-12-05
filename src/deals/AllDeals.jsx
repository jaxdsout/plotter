
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DealDetail from "./DealDetail";
import { Modal, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { load_deals } from "../actions/agent";

function AllDeals ({ load_deals, deals, user }) {
    const [showDealDetail, setShowDealDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (id) => {
        setShowDealDetail(showDealDetail === id ? null : id)
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        if (user){
            load_deals(user.id);
        }
        console.log("all_deals useffect")
    }, [load_deals, user])

    return (
        <>
            <div className="overflow-y-auto h-[40rem] mt-3 pt-5">
                {deals.length > 0 ? ( 
                <ul className='divide-y divide-gray-200 border border-gray-300 rounded-md'>
                    {deals.map(deal => (
                        <li 
                            className='p-3 flex flex-row justify-evenly items-start font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#232425]' 
                            key={deal.id}
                        >
                            <div className="flex justify-between">
                                <Link onClick={() => handleOpenModal(deal.id)}>
                                    <span><b>{deal.client_name}</b> | {deal.prop_name} | Move-in Date: {deal.move_date}</span>
                                </Link>
                            </div>
                            {showDealDetail === deal.id && (
                            <Modal className='' open={showModal} onClose={handleCloseModal}>
                                <Modal.Header>Deal Info</Modal.Header>
                                <Modal.Content>
                                    <DealDetail deal={deal} handleCloseModal={handleCloseModal}/>
                                </Modal.Content>
                                <Modal.Actions className="flex">
                                    <Button onClick={handleCloseModal}>CLOSE</Button>
                                </Modal.Actions>
                            </Modal>
                        )}
                        </li>
                    ))}
                </ul>
                ) : (
                    <div className="text-center text-white">
                        <p>No deals to display.</p>
                    </div>
                )}
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    deals: state.agent.deals,
    user: state.auth.user
});

export default connect(mapStateToProps, { load_deals })(AllDeals);