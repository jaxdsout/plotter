import '../styles/agent.css';
import { Link } from 'react-router-dom';

function AgentHome () {


    return (
        <div className="agent_homepage">
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

export default AgentHome;