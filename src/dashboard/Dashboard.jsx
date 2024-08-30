import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { auth_user, load_user } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import DashNavbar from './DashNav';
import Clients from '../clients/Clients';
import Lists from '../lists/Lists';
import Deals from '../deals/Deals';
import Dash from './Dash'
import Profile from './Profile';


function Dashboard ({ load_user, auth_user, isAuthenticated }) {
    const [activeTab, setActiveTab] = useState('home')
    const navigate = useNavigate();

    useEffect(() => {
        load_user();
        auth_user();
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login/');
        }
    }, [isAuthenticated]);


    const tabSwitch = () => {
        switch (activeTab) {
            case 'home':
                return <Dash />;
            case 'clients':
                return <Clients />;
            case 'lists':
                return <Lists />
            case 'deals':
                return <Deals />
            case 'profile':
                return <Profile />
            default:
                return <Dash />
            }
    }

    return (    
        <div className='container'>
            <DashNavbar setActiveTab={setActiveTab} />
            {tabSwitch()}
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
});

export default connect(mapStateToProps, { load_user, auth_user })(Dashboard);