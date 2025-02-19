import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Clients from '../clients/Clients';
import Lists from '../lists/Lists';
import Deals from '../deals/Deals';
import Dash from './Dash'
import ProfileWidget from './ProfileWidget';
import { Divider } from 'semantic-ui-react';
import { auth_user, refresh_token, load_user, lock_out } from '../store/actions/auth';
import { connect } from 'react-redux';

function Dashboard ({ auth_user, refresh_token, access, refresh, lock_out }) {
    const [profileHover, setProfileHover] = useState(false);
    const location = useLocation();
    const basePath = location.pathname.split('/').pop();

    const handleProfileWidget = () => {
        setProfileHover(prev => !prev);
    };

    

    const checkAuth = useCallback(() => {
        if (!access && !refresh) {
            lock_out();
        } else if (!access) {
            try {
                refresh_token();
                load_user();
            } catch (err) {
                console.error("Failed to refresh token:", err);
                lock_out();
            }
        } else {
            auth_user(location.pathname);
        }
    }, [access, refresh, auth_user, refresh_token, lock_out]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);


    return (    
        <div className='flex flex-col items-center justify-evenly'>
            <div className="w-11/12 md:w-3/4 max-w-[1000px] p-5 mt-10 bg-gradient-to-b from-[#26282B] to-[#1f2124] shadow-inner shadow-md rounded-lg mb-10 pb-10">
                <div className='z-0 p-5 flex flex-row items-center justify-center bg-[#1f2124] bg-blend-color-burn rounded-md'>
                    <Tab to="/dashboard/home" icon="home icon" subtitle="home" currentPath={location.pathname} />
                    <Tab to="/dashboard/clients" icon="users icon" subtitle="clients" currentPath={location.pathname} />
                    <Tab to="/dashboard/lists" icon="list alternate icon" subtitle="lists" currentPath={location.pathname} />
                    <Tab to="/dashboard/deals" icon="chart pie icon" subtitle="deals" currentPath={location.pathname} />
                    <div className='flex flex-col items-center justify-center ml-4 mr-4'>
                        <Link onClick={handleProfileWidget}
                            className='mmont drop-shadow-md text-2xl sm:text-3xl active:translate-y-0.5 text-white hover:text-[#5F85DB]'
                        >
                            <i className="user circle icon !-mr-0 !mb-3 !h-[27px]" />                            
                        </Link>
                        <p className='text-[0.65rem] text-white mont'>PROFILE</p>
                    </div>

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
                    <div className='z-1 absolute inset-y-72 -mt-3' onDoubleClick={() => handleProfileWidget()}>
                        <ProfileWidget /> 
                    </div>
                )}
        </div>
    )
}


const Tab = ({ to, icon, onClick, currentPath, subtitle }) => {
    const isActive = currentPath === to;

    return (
        <div className='flex flex-col items-center justify-end ml-4 mr-4'>
            <a
                href={to}
                onClick={onClick}
                className={`mont drop-shadow-md text-2xl sm:text-3xl active:translate-y-0.5
                    ${isActive ? "text-[#89a2dc]" : "text-white"} hover:text-[#5F85DB]`}
            >
                {icon ? 
                        <i className={`${icon} !-mr-0 !mb-3 !h-[27px]`} />
                    : null
                }
            </a>
            <p className='mont text-[0.65rem] text-white'>{subtitle.toUpperCase()}</p>

        </div>

    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    access: state.auth.access,
    refresh: state.auth.refresh,
    user: state.auth.user,
});

export default connect(mapStateToProps, { auth_user, refresh_token, load_user, lock_out })(Dashboard);