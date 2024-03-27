import '../App.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard () {

    const [agent, setAgent] = useState(null)

    useEffect(()=> {
        const token = localStorage.getItem('token');
        console.log(token)
    }, [])

    return (
        <div className="agent_homepage">
            <h1> Hi! </h1>
            <div className="lists container">
                <h3>LISTS</h3>
                <Link to='/lists/create'><button className='nav_button'>CREATE LIST</button></Link>
                <p>RECENT LISTS</p>
                    <ul>
                        <li>aaa</li>
                        <li>aaa</li>
                        <li>aaa</li>
                    </ul>
            </div>
            <div className="clients container">
                <h3>CLIENTS</h3>
                <Link to='/clients/create'><button className='nav_button'>NEW CLIENT</button></Link>
                <form>
                    <input></input>
                    <button className='nav_button'>SEARCH CLIENTS</button>
                </form>
            </div>
        </div>
    )
}

export default Dashboard;