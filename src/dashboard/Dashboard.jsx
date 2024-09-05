import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { auth_user, load_user } from '../actions/auth';
import { useNavigate, Link } from 'react-router-dom';
import Clients from '../clients/Clients';
import Lists from '../lists/Lists';
import Deals from '../deals/Deals';
import Dash from './Dash'
import Profile from './Profile';
import {ReactComponent as Home} from '../components/home.svg'
import {ReactComponent as Person} from '../components/person-circle.svg'


function Dashboard ({ load_user, auth_user, isAuthenticated }) {
    const [activeTab, setActiveTab] = useState('home')
    const navigate = useNavigate();

    console.log(isAuthenticated)
    useEffect(() => {
            load_user();
            auth_user();
    }, [load_user, auth_user]);

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
        <div className='container pb-5 pt-5'>
            <div className='navbar p-5 bg-body-secondary'>
                <Link onClick={() => setActiveTab('home')}><Home className='icon'/></Link>
                <Link className='poetsen tabs'  onClick={() => setActiveTab('clients')}>clients</Link>
                <Link className='poetsen tabs'  onClick={() => setActiveTab('lists')}>lists</Link>
                <Link className='poetsen tabs' onClick={() => setActiveTab('deals')}>deals</Link>
                <Link className='poetsen tabs' onClick={() => setActiveTab('profile')}><Person className="icon"/></Link>
            </div>
            {tabSwitch()}
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
});

export default connect(mapStateToProps, { load_user, auth_user })(Dashboard);