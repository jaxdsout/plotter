import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { auth_user, load_user } from '../actions/auth';
import { Routes, Route } from 'react-router-dom';
import DashNavbar from './DashNav';
import Profile from './Profile';
import Clients from '../clients/Clients';
import Lists from '../lists/Lists';
import Deals from '../deals/Deals';
import Stats from './Stats'


function Dashboard (props) {
    const [activeTab, setActiveTab] = useState('home')

    useEffect(() => {
        props.auth_user();
        props.load_user();
    }, [])

    const tabSwitch = () => {
        switch (activeTab) {
            case 'home':
                return <Stats />;
            case 'clients':
                return <Clients />;
            case 'lists':
                return <Lists />
            case 'deals':
                return <Deals />
            default:
                return <Stats />
            }
    }


    return (
        <div className='container'>
            <div>
                <DashNavbar setActiveTab={setActiveTab} />
                {tabSwitch()}
            </div>
            <div>
                <Profile />
            </div>
        </div>
    )
}

export default connect(null, { auth_user, load_user })(Dashboard);