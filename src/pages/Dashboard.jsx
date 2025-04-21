import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Dash from '../dash/Dash'
import NewClient from '../clients/NewClient';
import NewDeal from '../deals/NewDeal';
import NewList from '../lists/NewList';
import NewCard from '../cards/NewCard';
import AllClients from '../clients/AllClients';
import AllDeals from '../deals/AllDeals';
import AllLists from '../lists/AllLists';
import AllCards from '../cards/AllCards';
import ProfileWidget from '../components/ProfileWidget';
import Rates from './Rates';
import Calculator from './Calculator';
import { Divider } from 'semantic-ui-react';
import { auth_user, refresh_token, load_user, lock_out } from '../store/actions/auth';
import { connect } from 'react-redux';
import { profile_widget_close, profile_widget_open } from '../store/actions/ui';


function Dashboard ({ auth_user, refresh_token, access, refresh, lock_out, profileWidget, profile_widget_open, profile_widget_close }) {
    const location = useLocation();
    const basePath = location.pathname.split('/').pop();
    const pathName = location.pathname;


    const handleProfileWidget = () => {
        if (profileWidget) {
            profile_widget_close();
        } else {
            profile_widget_open();
        };
    }


    const checkTokens = useCallback(() => {
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
        }
    }, [access, refresh, refresh_token, lock_out ]);

    useEffect(() => {
        checkTokens();
    }, [checkTokens]);

    useEffect(() => {
        auth_user(pathName);
    }, [auth_user, pathName])


    return (    
        <div className='flex flex-col items-center justify-evenly'>
            <div className="w-11/12 md:w-3/4 max-w-[1000px] p-3 sm:p-5 mt-10 bg-white shadow-inner shadow-md rounded-lg mb-10 pb-10">
                <div className='z-0 p-3 sm:p-5 flex flex-row items-center justify-center bg-[#1f2124] bg-blend-color-burn rounded-md'>
                    <Tab to="/dashboard/home" icon="home icon" subtitle="home" currentPath={pathName} />
                    <Tab to="/dashboard/clients" icon="users icon" subtitle="clients" currentPath={pathName} />
                    <Tab to="/dashboard/lists" icon="list alternate icon" subtitle="lists" currentPath={pathName} />
                    <Tab to="/dashboard/deals" icon="chart pie icon" subtitle="deals" currentPath={pathName} />
                    <Tab to="/dashboard/rates" icon="percent icon" subtitle="rates" currentPath={pathName} />
                    <Tab to="/dashboard/cards" icon="address card icon" subtitle="cards" currentPath={pathName} />
                    <Tab to="/dashboard/calculator" icon="calculator icon" subtitle="calc" currentPath={pathName} />
                </div>
                <Divider/>
                <div className='mt-6'>
                    {basePath === 'home' && <Dash />}
                    {basePath === 'clients' && 
                        <>
                            <NewClient />
                            <AllClients />
                        </>
                    }
                    {basePath === 'lists' && 
                        <>
                            <NewList />
                            <AllLists />
                        </>
                    }
                    {basePath === 'deals' && 
                        <>
                            <NewDeal />
                            <AllDeals />
                        </>
                    }
                    {basePath === 'rates' && <Rates />}
                    {basePath === 'cards' && 
                        <>
                            <NewCard />
                            <AllCards />
                        </>
                    }
                    {basePath === 'calculator' && <Calculator />}
                </div>
            </div>
            {profileWidget ? (
                    <div className='z-1 absolute inset-y-72 -mt-3' onDoubleClick={() => handleProfileWidget()}>
                        <ProfileWidget /> 
                    </div>
            ) : null}
        </div>
    )
}


const Tab = ({ to, icon, currentPath, subtitle }) => {
    const isActive = currentPath === to;

    return (
        <div className='relative flex flex-col items-center justify-center px-2 md:px-5'>
            <h1 className='text-3xl md:text-5xl'>
                <Link to={to}>
                    { icon ? <i className={`font-mont drop-shadow-md active:translate-y-0.5
                    ${isActive ? "text-[#89a2dc]" : "text-white"} hover:text-[#5F85DB] ${icon}`} /> : null }
                </Link>
            </h1>
            <p className='font-mont text-white text-center text-[0.6rem] -mt-2 -ml-1'>{subtitle.toUpperCase()}</p>

        </div>

    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    access: state.auth.access,
    refresh: state.auth.refresh,
    user: state.auth.user,
    profileWidget: state.ui.profileWidget
});

export default connect(mapStateToProps, { auth_user, refresh_token, load_user, lock_out, profile_widget_close, profile_widget_open })(Dashboard);