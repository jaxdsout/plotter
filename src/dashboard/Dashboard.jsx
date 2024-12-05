import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { auth_user, load_user, logout, refresh_token } from '../actions/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Clients from '../clients/Clients';
import Lists from '../lists/Lists';
import Deals from '../deals/Deals';
import Dash from './Dash'
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
        <div className='flex flex-col items-center justify-evenly'>
            <div className="w-3/4 max-w-[1200px] max-h-[80rem] p-5 mt-5 bg-[#26282B] shadow-inner shadow-md rounded-lg mb-10 pb-10">
                <div className='z-0 p-5 flex flex-row items-center justify-center'>
                    <Link className='mont text-2xl p-3 text-white sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1]' to="/dashboard/home">
                        <i className="home icon"></i>
                    </Link>
                    <Link 
                        className='mont text-2xl p-3 text-white sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1]' 
                        to="/dashboard/clients">
                        clients
                    </Link>
                    <Link className='mont text-2xl p-3 text-white sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1]' to="/dashboard/lists">lists</Link>
                    <Link className='mont text-2xl p-3 text-white sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1]' to="/dashboard/deals">deals</Link>
                    <Link className='mont text-2xl p-3 text-white sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1]' onClick={handleProfileWidget}>
                        <i className="user circle icon"></i>
                    </Link>
                </div>
                <>
                    {basePath === 'home' && <Dash />}
                    {basePath === 'clients' && <Clients />}
                    {basePath === 'lists' && <Lists />}
                    {basePath === 'deals' && <Deals />}
                </>
            </div>
            {profileHover && (
                    <div className='z-1 absolute inset-y-72 !mt-3'>
                        <ProfileWidget /> 
                    </div>
                )}
        </div>
    )
}


const mapStateToProps = state => ({
    error: state.auth.error,
    user: state.auth.user,
    access: state.auth.access
});

export default connect(mapStateToProps, { load_user, auth_user, refresh_token, logout })(Dashboard);