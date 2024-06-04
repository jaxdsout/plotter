import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { auth_user, load_user } from '../actions/auth';
import { Routes, Route } from 'react-router-dom';
import DashNavbar from '../components/DashNav';
import Clients from './Clients';
import Lists from './Lists';
import Deals from './Deals';
import Stats from '../components/Stats'


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
        <div className="">
            <DashNavbar setActiveTab={setActiveTab} />
            {tabSwitch()}
        </div>
    )
}

export default connect(null, { auth_user, load_user })(Dashboard);