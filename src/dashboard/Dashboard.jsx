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


function Dashboard ({ load_user, auth_user, user }) {
    const [activeTab, setActiveTab] = useState('home')


    useEffect(() => {
        load_user();
        auth_user();
    }, [load_user, auth_user]);


    const tabSwitch = () => {
        switch (activeTab) {
            case 'home':
                return <Dash user={user}/>;
            case 'clients':
                return <Clients user={user}/>;
            case 'lists':
                return <Lists user={user}/>
            case 'deals':
                return <Deals user={user}/>
            case 'profile':
                return <Profile user={user} />
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
    user: state.auth.user,
});

export default connect(mapStateToProps, { load_user, auth_user })(Dashboard);