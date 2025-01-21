import GuestCard from './GuestCard';
import EarningDonut from './EarningDonut';
import EarningBar from './EarningBar';
import { connect } from "react-redux";
import { Divider } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Calculator from './Calculator';
import Todos from './Todos';
import Commission from './Commission';
import { load_deals, load_properties } from '../store/actions/agent';
import { tab_switch } from '../store/actions/ui';
import Upcoming from './Upcoming';

function Dash ({ user, load_deals, tab_switch, access, properties, refresh, load_properties }) {
    const [activeTab, setActiveTab] = useState("to-do");

    const navigate = useNavigate();
 
    const handleCommissionTab = () => {
        tab_switch();
        setActiveTab("commission")
    }

    const handleGuestCardTab = () => {
        tab_switch();
        setActiveTab("guest card")
    }

    useEffect(() => {
        if (!access && !refresh) {
            navigate('/login/');
        } 
    }, [access, refresh, navigate]);

    useEffect(() => {
        if (user !== null) {
            load_deals(user.id);            
        }
    }, [user, load_deals]);

    useEffect(() => {
        if (user !== null && properties?.length === 0) {
            load_properties();
        }
    }, [properties, load_properties, user]);

    return (
        <div className='transition ease-in-out delay-150'>
            <div className='flex flex-col xl:flex-row justify-evenly items-center pl-5 pr-5 pb-5'>
                <div className='pt-5 pb-5'>
                    <EarningDonut />
                </div>
                <div className='pt-5 pb-5'>
                    <EarningBar />
                </div>
            </div>
            <Divider/>
            <Upcoming />
            <Divider />
            <div className='z-0 flex flex-row items-center justify-center bg-[#26282B] bg-blend-color-burn rounded'>
                <Link 
                    className='mont drop-shadow-md text-2xl p-3 text-[#cccccc] sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1] active:translate-y-0.5' 
                    onClick={() => {setActiveTab("to-do")}}>
                        <i class="tasks icon"></i>

                </Link>
                <Link 
                    className='mont drop-shadow-md text-xl p-3 text-[#cccccc] sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1] active:translate-y-0.5' 
                    onClick={handleCommissionTab}>
                        <i class="percent icon"></i>

                </Link>
                <Link 
                    className='mont drop-shadow-md text-2xl p-3 text-[#cccccc] sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1] active:translate-y-0.5' 
                    onClick={handleGuestCardTab}>
                        <i class="address card icon"></i>
                </Link>
                <Link 
                    className='mont drop-shadow-md text-2xl p-3 text-[#cccccc] sm:text-3xl hover:text-[#5F85DB] !active:text-[#5475c1] active:translate-y-0.5' 
                    onClick={() => setActiveTab("calculator")}>
                        <i class="calculator icon"></i>
                </Link>
            </div>
            <Divider />
            <div className='flex items-center justify-center bg-[#1f2124] rounded'>
                {activeTab === `to-do` && <Todos />}
                {activeTab === 'commission' && <Commission />}
                {activeTab === 'guest card' && <GuestCard />}
                {activeTab === 'calculator' && <Calculator />}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    user: state.auth.user,
    deals: state.agent.deals,
    access: state.auth.access,
    refresh: state.auth.refresh,
    properties: state.agent.properties

});

export default connect(mapStateToProps, { load_deals, tab_switch, load_properties })(Dash);