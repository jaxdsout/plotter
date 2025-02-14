import GuestCard from './GuestCard';
import EarningDonut from './EarningDonut';
import EarningBar from './EarningBar';
import { connect } from "react-redux";
import { Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Calculator from './Calculator';
import Tasks from './Tasks';
import Commission from './Commission';
import { load_user_data} from '../store/actions/agent';
import { tab_switch } from '../store/actions/ui';
import Upcoming from './Upcoming';
import { load_user, } from '../store/actions/auth';

function Dash ({ tab_switch }) {
    const [activeTab, setActiveTab] = useState("to-do");

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
                <Tab tab_name="to-do" icon="tasks icon" activeTab={activeTab} setActiveTab={setActiveTab} tab_switch={tab_switch}></Tab>
                <Tab tab_name="commission" icon="percent icon" activeTab={activeTab} setActiveTab={setActiveTab} tab_switch={tab_switch}></Tab>
                <Tab tab_name="guest card" icon="address card icon" activeTab={activeTab} setActiveTab={setActiveTab} tab_switch={tab_switch}></Tab>
                <Tab tab_name="calculator" icon="calculator icon" activeTab={activeTab} setActiveTab={setActiveTab} tab_switch={tab_switch}></Tab>
            </div>
            <Divider />
            <div className='flex items-center justify-center bg-[#1f2124] rounded'>
                {activeTab === `to-do` && <Tasks />}
                {activeTab === 'commission' && <Commission />}
                {activeTab === 'guest card' && <GuestCard />}
                {activeTab === 'calculator' && <Calculator />}
            </div>
        </div>
    )
}

const Tab = ({ setActiveTab, activeTab, tab_name, tab_switch, icon }) => {
    const isActive = activeTab === tab_name;

    return (
        <button
            onClickCapture={() => {
                tab_switch();
                setActiveTab(tab_name);
            }}
            className={`mont drop-shadow-md text-xl p-3 text-[#cccccc] sm:text-3xl active:translate-y-0.5
                ${isActive ? "text-[#89a2dc]" : "text-white"} hover:text-[#5F85DB]`}
        >
            <i className={icon}></i> 
        </button>
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

export default connect(mapStateToProps, { tab_switch, load_user_data, load_user })(Dash);