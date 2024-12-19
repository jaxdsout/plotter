import GuestCard from './GuestCard';
import EarningDonut from './EarningDonut';
import EarningBar from './EarningBar';
import { connect } from "react-redux";
import { Divider } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { load_deals } from '../actions/agent';

function Dash ({ isAuthenticated, user, load_deals, deals }) {
    const navigate = useNavigate();

    const get_renewals = () => {
        if (!deals) return [];
        const now = new Date();
        return deals
            .filter(deal => deal.lease_end_date)
            .map(deal => ({ ...deal, lease_end_date: new Date(deal.lease_end_date) }))  
            .sort((a, b) => a.lease_end_date - b.lease_end_date)  
            .filter(deal => deal.lease_end_date >= now)  
            .slice(0, 5);  
    };


    const get_move_ins = () => {
        if (!deals) return [];
        const now = new Date();
        return deals
            .filter(deal => deal.move_date)  
            .map(deal => ({ ...deal, move_date: new Date(deal.move_date) }))  
            .sort((a, b) => a.move_date - b.move_date) 
            .filter(deal => deal.move_date >= now) 
            .slice(0, 5);
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (user) {
            load_deals(user.id)
        }
    }, [user, load_deals])

    const renewals = get_renewals();
    const move_ins = get_move_ins();

    return (
        <div>
            <div className='flex flex-col xl:flex-row justify-evenly items-center pl-5 pr-5 pb-5'>
                <div className='pt-5 pb-5'>
                    <EarningDonut />
                </div>
                <div className='pt-5 pb-5'>
                    <EarningBar />
                </div>
            </div>
            <Divider/>
            <div className="flex flex-col md:flex-row justify-evenly">
                <div className='p-5 w-full md:w-1/2'>
                    <h4 className='text-center text-white'>Upcoming Renewals</h4>
                    <ul className='divide-y divide-gray-200 border border-gray-300 rounded-md'>
                        {renewals.length ? (
                            renewals.map(deal => (
                                <li key={deal.id}>
                                    <div className='p-4 flex flex-row justify-center text-center items-center text-white hover:text-black hover:bg-gray-100 transition'>
                                        <p><b>Client:</b> {deal.client_name} <span className='pr-2 pl-2'>|</span> <b>Lease End Date:</b> {deal.lease_end_date.toLocaleDateString()} </p>
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
                        {move_ins.length ? (
                            move_ins.map(deal => (
                                <li key={deal.id}>
                                    <div className='p-4 flex flex-row justify-center text-center items-center text-white hover:text-black hover:bg-gray-100 transition'>
                                        <p><b>Client:</b> {deal.client_name} <span className='pr-2 pl-2'>|</span> <b>Move-In Date:</b> {deal.move_date.toLocaleDateString()} </p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className='p-4 text-center text-white'>No upcoming move-ins...</li>
                        )}
                    </ul>
                </div>
            </div>
            <Divider />
            <div className='flex items-center justify-center pt-5'>
                <GuestCard />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    deals: state.agent.deals
});

export default connect(mapStateToProps, { load_deals })(Dash);