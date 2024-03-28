import { useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Dashboard ({agent, handleDashboard}) {

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
                </div>
                <form className='client_search_bar'>
                    <input></input>
                    <button className='nav_button'>SEARCH CLIENTS</button>
                </form>
            </div>
            <div className="container">
                <div className='dash_header'>
                    <h3>LISTS</h3>
                    <Link to='/lists/create'><button className='nav_button'>CREATE LIST</button></Link>
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