import GuestCard from './GuestCard';
import EarningDonut from './EarningDonut';
import EarningBar from './EarningBar';
import { connect } from "react-redux";
import { Divider, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Dash ({ isAuthenticated }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className='z-0 container pt-5 pb-5 bg-dark-subtle d-flex flex-column'>
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
                        <li className='list-group-item'>Client 1</li>
                        <li className='list-group-item'>Client 2</li>
                        <li className='list-group-item'>Client 3</li>
                        <li className='list-group-item'>More...</li>
                    </ul>
                </div>
                <div>
                    <h4>Upcoming Move-Ins</h4>
                    <ul className='list-group'>
                        <li className='list-group-item'>Client 1</li>
                        <li className='list-group-item'>Client 2</li>
                        <li className='list-group-item'>Client 3</li>
                        <li className='list-group-item'>More...</li>
                    </ul>
                </div>
                <div className='d-flex flex-column justify-content-between'>
                    <GuestCard />
                    <Button type="submit">STATS</Button>
                </div>
                <div>
                    <h4>To Do's</h4>
                    <ul className='list-group'>
                        <li className='list-group-item'>Donut Chart: for Paid, Unpaid, Overdue, Cancelled</li>
                        <li className='list-group-item'>Bar Graph: Monthly earnings over Year</li>
                        <li className='list-group-item'>List: Past Client Renewals Coming Up</li>
                        <li className='list-group-item'>List: Client Move-Ins Approaching</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { })(Dash);