import GuestCard from './GuestCard';
import EarningDonut from './EarningDonut';
import EarningBar from './EarningBar';
import { connect } from "react-redux";
import { Divider, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { load_deals } from '../actions/agent';

function Dash ({ isAuthenticated, user, load_deals, deals }) {
    const navigate = useNavigate();

    const get_renewals = () => {
        if (!deals) return [];
        const now = new Date();
        return deals
            .filter(deal => deal.lease_end_date)  // Ensure lease_end_date exists
            .map(deal => ({ ...deal, lease_end_date: new Date(deal.lease_end_date) }))  // Convert date strings to Date objects
            .sort((a, b) => a.lease_end_date - b.lease_end_date)  // Sort by lease_end_date
            .filter(deal => deal.lease_end_date >= now)  // Filter to only upcoming renewals
            .slice(0, 5);  // Optional: Limit to top 5 upcoming renewals
    };


    const get_move_ins = () => {
        if (!deals) return [];
        const now = new Date();
        return deals
            .filter(deal => deal.move_date)  // Ensure move_date exists
            .map(deal => ({ ...deal, move_date: new Date(deal.move_date) }))  // Convert date strings to Date objects
            .sort((a, b) => a.move_date - b.move_date)  // Sort by move_date
            .filter(deal => deal.move_date >= now)  // Filter to only upcoming move-ins
            .slice(0, 5);  // Optional: Limit to top 5 upcoming move-ins
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
        <div className='container pt-5 pb-5 bg-dark-subtle'>
            <div className="d-flex flex-column flex-md-row flex-sm-column align-items-center justify-content-evenly">
                <div className='pb-3'>
                    <EarningDonut />
                </div>
                <div className='pb-3'>
                    <EarningBar />
                </div>
            </div>
            <Divider />
            <div className="d-flex flex-column flex-md-row flex-sm-column align-items-center justify-content-evenly">
                <div>
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
                <div>
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
                <div className=''>
                    <GuestCard />
                </div>
            </div>
            <div style={{ height: "200px" }}>
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