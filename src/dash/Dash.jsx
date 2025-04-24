import EarningDonut from './EarningDonut';
import EarningBar from './EarningBar';
import { Divider } from 'semantic-ui-react';
import Tasks from './Tasks';
import Upcoming from './Upcoming';

export default function Dash () {

    return (
        <div className='w-full flex flex-col p-2'>
            <div className='flex flex-col xl:flex-row justify-evenly items-center'>
                <EarningDonut />
                <EarningBar />
                <Tasks />
            </div>
            <Divider/>
            <Upcoming />          
        </div>
    )
}