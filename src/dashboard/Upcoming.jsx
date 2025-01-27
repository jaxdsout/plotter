import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

function Upcoming ({ deals }) {
    const [renewals, setRenewals] = useState([]);
    const [move_ins, setMoveIns] = useState([])

    const get_upcoming = useCallback(() => {
            if (deals?.length === 0) return [];
            const now = new Date();

            const filteredRenewals = deals
                .filter(deal => deal.lease_end_date)
                .map(deal => ({ ...deal, lease_end_date: new Date(deal.lease_end_date) }))  
                .sort((a, b) => a.lease_end_date - b.lease_end_date)  
                .filter(deal => deal.lease_end_date >= now)  
                .slice(0, 5);
            setRenewals(filteredRenewals);

            const filteredMoveIns = deals
                .filter(deal => deal.move_date)  
                .map(deal => ({ ...deal, move_date: new Date(deal.move_date) }))  
                .sort((a, b) => a.move_date - b.move_date) 
                .filter(deal => deal.move_date >= now) 
                .slice(0, 5);
            setMoveIns(filteredMoveIns);
    }, [deals]);


    useEffect(() => {
        if (deals?.length > 0) {
            get_upcoming();
        }
    }, [deals, get_upcoming])


    return (
        <div className="flex flex-col md:flex-row justify-evenly">
            <div className='p-5 w-full md:w-1/2'>
                <h4 className='text-center text-white'>Upcoming Renewals</h4>
                <ul className='divide-y divide-gray-200 border border-gray-300 rounded-md'>
                    {renewals.length > 0 ? (
                        renewals.map(deal => (
                            <li key={deal.id}>
                                <div className='p-4 flex flex-col justify-center text-center text-nowrap items-center text-white hover:text-black hover:bg-gray-100 transition'>
                                    <span className="text-sm md:text-base p-0">
                                        <b>Client:</b> {deal.client_name}
                                    </span>
                                    <span className="text-sm md:text-base p-0">
                                        <b>Lease End Date:</b> {deal.lease_end_date.toLocaleDateString()}
                                    </span>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className='p-4 text-center text-white'>No upcoming renewals...</li>
                    )}
                </ul>
            </div>
            <div className='p-5 w-full md:w-1/2'>
                <h4 className='text-center text-white'>Upcoming Move-Ins</h4>
                <ul className='divide-y divide-gray-200 border border-gray-300 rounded-md'>
                    {move_ins.length > 0 ? (
                        move_ins.map(deal => (
                            <li key={deal.id} className="p-4">
                                <div className='flex flex-col md:flex-row justify-center text-center items-center md:items-start text-white hover:text-black hover:bg-gray-100 transition'>
                                    <span className="text-sm md:text-base m-2">
                                        <b>Client:</b> {deal.client_name}
                                    </span>
                                    <span className="text-sm md:text-base m-2">
                                        <b>Move-In Date:</b> {deal.move_date.toLocaleDateString()}
                                    </span>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className='p-4 text-center text-white'>No upcoming move-ins...</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    user: state.auth.user,
    deals: state.agent.deals,
});

export default connect(mapStateToProps, {  })(Upcoming);