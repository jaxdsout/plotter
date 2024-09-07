
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DealDetail from "./DealDetail";
import { Modal, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { load_deals } from "../actions/agent";


function AllDeals ({ load_deals, deals, user }) {
    const [showDealDetail, setShowDealDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const userID = user.id

    const handleOpenModal = (id) => {
        setShowDealDetail(showDealDetail === id ? null : id)
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        console.log("firing all deals")
        load_deals(userID);
    }, [load_deals, userID])

    return (
        <>
            <h6 className="noto-sans"> all deals </h6>
            <div className="overflow-y-auto plotterbox">
                <ul class="list-group">
                    {deals.map(deal => (
                        <li class="list-group-item" key={deal.id}>
                        <Link onClick={() => handleOpenModal(deal.id)}>
                            {deal}
                        </Link>
                        {showDealDetail === deal.id && (
                            <Modal className='' open={showModal} onClose={handleCloseModal}>
                                <Modal.Header>Deal Info</Modal.Header>
                                <Modal.Content>
                                    <>
                                        <DealDetail deal={deal} />
                                    </>
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
    deals: state.agent.deals,
    user: state.auth.user
});

export default connect(mapStateToProps, { load_deals })(AllDeals);