import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { auth_user, load_user, logout, refresh_token } from '../store/actions/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Clients from '../clients/Clients';
import Lists from '../lists/Lists';
import Deals from '../deals/Deals';
import Dash from './Dash'
import ProfileWidget from './ProfileWidget';
import { Divider } from 'semantic-ui-react';


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
        } else if (!isAuthenticated && !access) {
            navigate('/login/');
        }

    }, [access, refresh_token, isAuthenticated, navigate,]);

    // useEffect(() => {
    //     if (!isAuthenticated && !access) {
    //         navigate('/login/');
    //     }
    // }, [isAuthenticated, navigate, access]);

    const basePath = location.pathname.split('/').pop();

    return (    
        <div className='flex flex-col items-center justify-evenly'>
            <div className="w-11/12 md:w-3/4 max-w-[900px] p-5 mt-5 bg-gradient-to-b from-[#26282B] to-[#1f2124] shadow-inner shadow-md rounded-lg mb-10 pb-10">
                <div className='z-0 p-5 flex flex-row items-center justify-center bg-[#1f2124] bg-blend-color-burn rounded'>
                    <Link className='mont drop-shadow-md text-2xl p-3 text-white sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1] active:translate-y-0.5' to="/dashboard/home">
                        <i className="home icon"></i>
                    </Link>
                    <Link className='mont drop-shadow-md text-2xl p-3 text-white sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1] active:translate-y-0.5' to="/dashboard/clients">clients</Link>
                    <Link className='mont drop-shadow-md text-2xl p-3 text-white sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1] active:translate-y-0.5' to="/dashboard/lists">lists</Link>
                    <Link className='mont drop-shadow-md text-2xl p-3 text-white sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1] active:translate-y-0.5' to="/dashboard/deals">deals</Link>
                    <Link className='mont drop-shadow-md text-2xl p-3 text-white sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1] active:translate-y-0.5' onClick={handleProfileWidget}>
                        <i className="user circle icon"></i>
                    </Link>
                </div>
                <Divider/>
                <div className='mt-6'>
                    {basePath === 'home' && <Dash />}
                    {basePath === 'clients' && <Clients />}
                    {basePath === 'lists' && <Lists />}
                    {basePath === 'deals' && <Deals />}
                </div>
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