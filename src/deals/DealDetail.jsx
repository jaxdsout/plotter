import { Divider, Button, Dimmer, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import DeleteDeal from "./DeleteDeal.jsx";
import { useEffect } from "react";
import { load_deal, load_deals, update_deal_status } from "../store/actions/agent.js";
import { set_deal_mode } from "../store/actions/ui.js";
import EditDeal from "./EditDeal.jsx";

function DealDetail ({ dealID, deal, handleCloseModal, isDealMode, update_deal_status, set_deal_mode, load_deal, load_deals, user }) {
    
    const handleEditDeal = async () => {
        if (user && deal) {
            set_deal_mode()
        }
    }

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
            await update_deal_status(dealID, status);
            await load_deal(dealID);
            load_deals(user.id);
        }
    }

    useEffect(() => {
        if (dealID) {
            load_deal(dealID);
        }
    }, [dealID, load_deal])

    return(
        <>
            {isDealMode ? (
                <>
                    <EditDeal dealID={dealID}/>
                </>
            ) : (
                <>
                    {deal ? (
                        <div className="flex flex-col mb-4">
                            <div className="text-center">
                                <p><b>Date Deal Created: </b>{formatDate(deal?.deal_date)}</p>
                                <Divider />
                            </div>
                            <div className="flex flex-row justify-evenly">
                                <div>
                                    <p><b>Client: </b>{deal?.client_name}</p>
                                    <p><b>Property: </b>{deal?.prop_name}</p>
                                    <p><b>Unit Number: </b>{deal?.unit_no}</p>
                                    <p><b>Lease Term: </b>{deal?.lease_term}</p>
                                    <p><b>Move Date: </b>{formatDate(deal?.move_date)}</p>
                                    <p><b>Rent: </b>${deal?.rent}</p>
                                    {deal?.rate ? (
                                        <p><b>Rate: </b>{deal?.rate}%</p>
                                    ) : ( 
                                        <p><b>Rate: </b>${deal?.flat_fee}</p>
                                    )}
                                    <p><b>Commission: </b>${deal?.commission}</p>
                                </div>
                                <div className="flex flex-col justify-start">
                                    <div>
                                        <p><b>Lease End Date: </b>{deal?.lease_end_date}</p>
                                        <p><b>Invoice Date: </b>{deal?.invoice_date}</p>
                                    </div>
                                    <div className="flex flex-col mt-5">
                                        {deal?.status === 'not' ? (
                                            <Button onClick={() => changeStatus(deal.id, 'pend')} color="yellow" className="!mb-4">SET INVOICED</Button>
                                        ) : deal.status === 'pend' ? (
                                            <Button onClick={() => changeStatus(deal.id, 'paid')} color="green" className="!mb-4">SET PAID</Button>
                                        ) : deal.status === 'over' ? (
                                            <>
                                                <Button disabled color="red" className="!mb-4">INVOICE OVERDUE</Button>
                                                <Button onClick={() => changeStatus(deal.id, 'paid')} color="green" className="!mb-4">SET PAID</Button>
                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )}
                                        {deal.status === 'paid' ? (
                                            <Button disabled color="green" className="!mb-4">INVOICE PAID</Button>
                                        ) : (
                                            <>
                                            </>
                                        )}
                                        <Button className="drop-shadow-sm text-nowrap !bg-[#90B8F8] hover:!bg-[#5F85DB] !mb-4" type="submit" onClick={handleEditDeal}>EDIT DEAL</Button>
                                        <DeleteDeal deal={deal} handleCloseModal={handleCloseModal}/>
                                    </div>    
                                </div>  
                            </div>
                        </div>
                    ) : (
                        <>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </>
                    )}
                </> 
            )}
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    deal: state.agent.deal,
    isDealMode: state.ui.isDealMode
});

export default connect(mapStateToProps, { update_deal_status, load_deal, load_deals, set_deal_mode })(DealDetail);