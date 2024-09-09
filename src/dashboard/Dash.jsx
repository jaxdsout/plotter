import GuestCard from '../components/GuestCard';
import EarningDonut from '../components/EarningDonut';
import EarningBar from '../components/EarningBar';
import { useEffect } from "react";
import { load_user, auth_user } from "../actions/auth";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";


function Dash ({ isAuthenticated, load_user, auth_user, user }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            load_user();
            auth_user();
        }
    }, [user, auth_user, load_user]);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login/')
        }
    }, [isAuthenticated, navigate])

    return (
        <div className='z-0 container pt-5 pb-5 bg-dark-subtle'>
            <div className="row">
                <div className="col-md-6">
                    <EarningBar />
                    <EarningDonut />
                </div>
                <div className="col-md-6">
                    <div>
                        <h4>To Do's</h4>
                        <ul className='list-group'>
                            <li className='list-group-item'>Donut Chart: for Paid, Unpaid, Overdue, Cancelled</li>
                            <li className='list-group-item'>Bar Graph: Monthly earnings over Year</li>
                            <li className='list-group-item'>List: Past Client Renewals Coming Up</li>
                            <li className='list-group-item'>List: Client Move-Ins Approaching</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h4>Guest Cards</h4>
                        <GuestCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    user: state.auth.user
});

export default connect(mapStateToProps, { load_user, auth_user })(Dash);