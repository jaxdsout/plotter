import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { auth_user, load_user, logout, refresh_token } from '../actions/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Clients from '../clients/Clients';
import Lists from '../lists/Lists';
import Deals from '../deals/Deals';
import Dash from './Dash'
import {ReactComponent as Home} from '../components/home.svg'
import {ReactComponent as Person} from '../components/person-circle.svg'
import ProfileWidget from './ProfileWidget';


function Dashboard ({ load_user, auth_user, refresh_token, access, isAuthenticated }) {
    const [profileHover, setProfileHover] = useState(false);
    const location = useLocation(); 
    const navigate = useNavigate();


    const handleProfileWidget = () => {
        setProfileHover(prev => !prev);
    };

    useEffect(() => {
        auth_user();
        load_user();
    }, [load_user, auth_user]);

    useEffect(() => {
        if (!access) {
            refresh_token();
        }
    }, [access, refresh_token]);

    useEffect(() => {
        if (!isAuthenticated && !access) {
            navigate('/login/');
        }
    }, [isAuthenticated, navigate, access]);

    const basePath = location.pathname.split('/').pop();

    return (    
        <div className='container mb-5 mt-5'>
            <div className='z-0 navbar p-5 bg-body-tertiary rounded-4 mb-4'>
                <Link to="/dashboard/home"><Home className='icon dashnav_button' /></Link>
                <Link className='dashnav_button tabs' to="/dashboard/clients">clients</Link>
                <Link className='dashnav_button tabs' to="/dashboard/lists">lists</Link>
                <Link className='dashnav_button tabs' to="/dashboard/deals">deals</Link>
                <Link className='dashnav_button tabs' onClick={handleProfileWidget}>
                    <Person className="icon"/>
                </Link>
            </div>
            {profileHover && (
                <div className='z-1 position-absolute end-0 p-3'>
                    <ProfileWidget /> 
                </div>
            )}
            <>
                {basePath === 'home' && <Dash />}
                {basePath === 'clients' && <Clients />}
                {basePath === 'lists' && <Lists />}
                {basePath === 'deals' && <Deals />}
            </>
        </div>
    )
}


const mapStateToProps = state => ({
    error: state.auth.error,
    user: state.auth.user,
    access: state.auth.access
});

export default connect(mapStateToProps, { load_user, auth_user, refresh_token, logout })(Dashboard);