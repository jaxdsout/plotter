import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import ClientForm from '../components/ClientForm'
import ListForm from "../components/ListForm"
import MapBox from "../components/MapBox"

const api_url = process.env.REACT_APP_APIURL


function Dashboard () {

    
    const [agent, setAgent] = useState({
        first_name: '',
        last_name: '',
        email: '',
        trec_id: '',
        id: ''
    })


    const handleDashboard = async () => {
        try {
            const token = localStorage.getItem('token');
            const encoded_token = encodeURIComponent(token)
            const response = await axios.get(`${api_url}/plotter/agents/?email=${encoded_token}`);
            console.log(response.data[0])
            if (response.data && response.data.length === 1) {
            setAgent(response.data[0])
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        handleDashboard()
    }, [])

    return (
        <div className="dashboard">
            <h1> Hi! {agent.first_name} </h1>
            <div className='subdash'>
               <div className="container">
                <div className='dash_header'>
                    <h3>CLIENTS</h3>
                    <Link to='/dashboard/create-client/'><button className='nav_button'> + NEW CLIENT</button></Link>
                    <ClientForm />
                </div>
                <form className='client_search_bar'>
                    <input></input>
                    <button className='nav_button'>SEARCH CLIENTS</button>
                </form>
            </div>
            <div className="container">
                <div className='dash_header'>
                    <h3>LISTS</h3>
                    <Link to='/dashboard/create-list/'><button className='nav_button'>CREATE LIST</button></Link>
                    <ListForm />
                    <MapBox />
                </div>
                <p>RECENT LISTS</p>
                    <ul>
                        <li>aaa</li>
                        <li>aaa</li>
                        <li>aaa</li>
                    </ul>
            </div> 
            </div>
            
        </div>
    )
}

export default Dashboard;