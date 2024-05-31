import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import ClientForm from '../components/ClientForm'
import ListForm from "../components/ListForm"
import MapBox from "../components/MapBox"

import {ReactComponent as Home} from '../components/home.svg'

const api_url = process.env.REACT_APP_APIURL


function Dashboard () {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection(prevSection => prevSection === section ? null : section);
    };
    
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
        <div className="container">
            <div className=' d-flex align-items-center'>
                <Link to=""><Home className='icon'/></Link>
                <Link to=""><h2 className='poetsen tabs'>clients</h2></Link>
                <Link><h2 className='poetsen tabs'>lists</h2></Link>
                <Link><h2 className='poetsen tabs'>deals</h2></Link>

            </div>
            <div className='container'>
                <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientNew" aria-expanded="false" aria-controls="collapseClientNew">
                    NEW CLIENT
                </button>

                <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientSearch" aria-expanded="false" aria-controls="collapseClientSearch">
                    SEARCH CLIENTS
                </button>



                <div class="collapse multi-collapse" id="collapseClientNew">
                    <div class="card card-body">
                        <ClientForm />
                    </div>
                </div>
                
                <div class="collapse multi-collapse" id="collapseClientSearch">
                    <div class="card card-body">
                    <form className='client_search_bar'>
                        <input type='search'></input>
                        <button className='nav_button'>SEARCH CLIENTS</button>
                    </form>
                    </div>
                </div>
            


            </div>

            <div className='container'>
        
                
                <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseListNew" aria-expanded="false" aria-controls="collapseListNew">
                    CREATE LIST
                </button>

                <button type="button" data-bs-toggle="collapse" data-bs-target="#collapseListRecent" aria-expanded="false" aria-controls="collapseListRecent">
                    RECENT LISTS
                </button>

                <div class="collapse" id="collapseListNew">
                    <div class="card card-body">
                        <ListForm />
                        <MapBox />
                    </div>
                </div>

                <div class="collapse" id="collapseListRecent">
                    <div class="card card-body">
                        <p>RECENT LISTS</p>
                        <ul>
                            <li>aaa</li>
                            <li>aaa</li>
                            <li>aaa</li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Dashboard;