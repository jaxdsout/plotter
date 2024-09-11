import { FormField, Divider, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import DeleteDeal from "./DeleteDeal.jsx";
import { load_deals, update_deal_status } from "../actions/agent.js";

function DealDetail ({ deal, handleCloseModal, update_deal_status, load_deals, user }) {

    const formatDate = (dateStr) => {
        const dateObj = new Date(dateStr);
        return dateObj.toLocaleString('default', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        }).replace(',', '/');
    };

    const changeStatus = async (dealID, status) => {
        if (status) {
            console.log(status, "status sent")
            await update_deal_status(dealID, status)
            load_deals(user.id)
            console.log(user.id, "userid")
        }
    }


    return(
        <>
            <div className="d-flex flex-column mb-4">
                <div className="text-center">
                    <p><b>Date Deal Created: </b>{formatDate(deal.deal_date)}</p>
                    <Divider />
                </div>
                <div className="d-flex flex-row justify-content-evenly">
                    <div>
                        <p><b>Client: </b>{deal.client_name}</p>
                        <p><b>Property: </b>{deal.prop_name}</p>
                        <p><b>Unit Number: </b>{deal.unit_no}</p>
                        <p><b>Lease Term: </b>{deal.lease_term}</p>
                        <p><b>Move Date: </b>{formatDate(deal.move_date)}</p>
                        <p><b>Rent: </b>${deal.rent}</p>
                        {deal.rate ? (
                            <p><b>Rate: </b>{deal.rate}%</p>
                        ) : ( 
                            <p><b>Rate: </b>${deal.flat_fee}</p>
                        )}
                        <p><b>Commission: </b>${deal.commission}</p>
                    </div>
                    <div className="d-flex flex-column justify-content-between">
                        <div>
                            <p><b>Lease End Date: </b>{deal.lease_end_date}</p>
                            <p><b>Invoice Date: </b>{deal.invoice_date}</p>
                        </div>
                        {deal.status === 'not' ? (
                            <Button onClick={() => changeStatus(deal.id, 'pend')} color="yellow">SET INVOICED</Button>
                        ) : deal.status === 'pend' ? (
                            <Button onClick={() => changeStatus(deal.id, 'paid')} color="green">SET PAID</Button>
                        ) : deal.status === 'over' ? (
                            <>
                                <Button disabled color="red">INVOICE OVERDUE</Button>
                                <Button onClick={() => changeStatus(deal.id, 'paid')} color="green">SET PAID</Button>
                            </>
                        ) : deal.staus === 'paid' (
                            <p>DEAL PAID</p>
                        )}
                        <Button>EDIT DEAL</Button>
                        <DeleteDeal deal={deal} handleCloseModal={handleCloseModal}/>
                    </div>  
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { update_deal_status, load_deals })(DealDetail);