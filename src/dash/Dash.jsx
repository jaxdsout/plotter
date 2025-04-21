import EarningDonut from './EarningDonut';
import EarningBar from './EarningBar';
import { connect } from "react-redux";
import { Divider, Loader } from 'semantic-ui-react';
import Tasks from './Tasks';
import { load_user_data} from '../store/actions/agent';
import Upcoming from './Upcoming';
import { load_user, } from '../store/actions/auth';

function Dash ({ isLoaded }) {

    return (
        <div className='transition ease-in-out delay-150'>
            {isLoaded ? (
                <>
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
                    <div className='flex items-center justify-center rounded'>
                         <Tasks />
                    </div>
                    <Divider />
                </>
            ) : (
                <div className='h-[40rem]'>
                    <Loader inverted active />
                </div>
            )}
        
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    user: state.auth.user,
    deals: state.agent.deals,
    access: state.auth.access,
    refresh: state.auth.refresh,
    properties: state.agent.properties,
    isLoaded: state.agent.isLoaded

});

export default connect(mapStateToProps, { load_user_data, load_user })(Dash);