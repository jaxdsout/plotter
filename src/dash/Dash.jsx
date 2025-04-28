import EarningDonut from './EarningDonut';
import EarningBar from './EarningBar';
import { Divider } from 'semantic-ui-react';
import Tasks from './Tasks';
import Upcoming from './Upcoming';

export default function Dash () {

    return (
        <div className='flex flex-col md:flex-row items-center justify-start md:items-start md:justify-center  overflow-y-scroll overflow-x-hidden md:overflow-y-hidden w-full max-h-[50rem]'>
            <div className='mx-3 w-full md:w-2/3 flex flex-col'>
                <Tasks />
                <Upcoming />
            </div>
            <div className='mx-3 w-full md:w-1/3 flex flex-col justify-center'>
                <EarningDonut />
                <EarningBar />
            </div>     
        </div>
    )
}