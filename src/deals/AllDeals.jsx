
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
            <div className="overflow-y-auto plotterbox mt-3">
                {deals.length > 0 ? ( 
                <ul className="list-group">
                    {deals.map(deal => (
                        <li className="list-group-item" key={deal.id}>
                            <div className="d-flex justify-content-between">
                                <span><b>{deal.client_name}</b> | {deal.prop_name} | Move-in Date: {deal.move_date}</span>
                                <Link onClick={() => handleOpenModal(deal.id)}>
                                    <i class="ellipsis horizontal icon"></i>
                                </Link>
                            </div>
                            {showDealDetail === deal.id && (
                            <Modal className='' open={showModal} onClose={handleCloseModal}>
                                <Modal.Header>Deal Info</Modal.Header>
                                <Modal.Content>
                                    <DealDetail deal={deal} handleCloseModal={handleCloseModal}/>
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