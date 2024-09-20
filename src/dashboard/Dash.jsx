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
        <div className='container pt-5 pb-5 bg-body-tertiary rounded-4'>
            <div className='d-flex flex-column flex-sm-column flex-md-row justify-content-evenly align-items-center p-4'>
                <div>
                    <EarningDonut />
                </div>
                <div>
                    <EarningBar />
                </div>
            </div>
            <Divider />
            <div className="d-flex flex-column flex-md-row flex-sm-column align-items-center justify-content-evenly p-4">
                <div className='text-center pt-3'>
                    <h4>Upcoming Renewals</h4>
                    <ul className='list-group'>
                        {renewals.length ? (
                            renewals.map(deal => (
                                <li key={deal.id} className='list-group-item'>
                                    <b>Client:</b> {deal.client_name} | <b>Lease End Date:</b> {deal.lease_end_date.toLocaleDateString()}
                                </li>
                            ))
                        ) : (
                            <li className='list-group-item'>No upcoming renewals...</li>
                        )}
                    </ul>
                </div>
                <div className='text-center pt-3'>
                    <h4>Upcoming Move-Ins</h4>
                    <ul className='list-group'>
                        {move_ins.length ? (
                            move_ins.map(deal => (
                                <li key={deal.id} className='list-group-item'>
                                    <b>Client:</b> {deal.client_name} | <b>Move Date:</b> {deal.move_date.toLocaleDateString()}
                                </li>
                            ))
                        ) : (
                            <li className='list-group-item'>No upcoming move-ins...</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-center mt-5'>
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