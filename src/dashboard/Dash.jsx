import { useEffect, useState } from 'react';
import axios from 'axios';
import GuestCard from '../components/GuestCard';
import EarningDonut from '../components/EarningDonut';
import EarningBar from '../components/EarningBar';


function Dash ({ userID }) {


    return (
        <div className='container bg-dark-subtle d-flex justify-content-between p-4'>
                <div className='container'>
                    <div className="row pb-5">
                        <div className="col-md-6">
                            <EarningBar />
                        </div>
                        <div className="col-md-6">
                            <EarningDonut />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <h4>To Do's</h4>
                                <ul className='list-group'>
                                    <li className='list-group-item'>Donut Chart: for Paid, Unpaid, Overdue, Cancelled</li>
                                    <li className='list-group-item'>Bar Graph: Monthly earnings over Year</li>
                                    <li className='list-group-item'>List: Past Client Renewals Coming Up</li>
                                    <li className='list-group-item'>List: Client Move-Ins Approaching</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                                <h4>Guest Cards</h4>
                                <GuestCard />
                        </div>
                    </div>     
                </div>
    
        </div>
    )
}



export default Dash;