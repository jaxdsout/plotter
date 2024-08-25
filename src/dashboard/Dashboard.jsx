import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { auth_user, load_user } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import DashNavbar from './DashNav';
import Clients from '../clients/Clients';
import Lists from '../lists/Lists';
import Deals from '../deals/Deals';
import Dash from './Dash'
import Settings from './Settings';


function Dashboard (props) {
    const [activeTab, setActiveTab] = useState('home')
    const [userID, setUserID] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        props.load_user();
        props.auth_user();
        if (props.user) {
            setUserID(props.user.id);
        }
    }, [])

    useEffect(() => {
        if (props.user) {
            setUserID(props.user.id);        }
    }, [props.user]);

    useEffect(() => {
        if (!props.isAuthenticated) {
            navigate('/login/');
        }
    }, [navigate]);

    const tabSwitch = () => {
        switch (activeTab) {
            case 'home':
                return <Dash userID={userID}/>;
            case 'clients':
                return <Clients userID={userID}/>;
            case 'lists':
                return <Lists userID={userID}/>
            case 'deals':
                return <Deals />
            case 'settings':
                return <Settings />
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
    user: state.auth.user
});

export default connect(mapStateToProps, { load_user, auth_user })(Dashboard);