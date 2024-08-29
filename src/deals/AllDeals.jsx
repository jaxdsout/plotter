
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DealDetail from "./DealDetail";
import { Modal, Button, Divider } from "semantic-ui-react";


function AllDeals ({ all_deals, deals }) {
    const [showDealDetail, setShowDealDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (id) => {
        setShowDealDetail(showDealDetail === id ? null : id)
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        console.log("firing all deals")
        all_deals();
    }, [])

    return (
        <>
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
        </>
    )
}

export default AllDeals