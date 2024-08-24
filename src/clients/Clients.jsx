import NewClient from "./NewClient"
import AllClients from "./AllClients"
import ClientDetail from './ClientDetail'
import { useState } from "react";

function Clients ({ userID }) {
    const [showNewClient, setShowNewClient] = useState(false);

    const toggleNewClient = () => {
        setShowNewClient(!showNewClient);
    };
    

    return (
        <div className="container pt-5 bg-dark-subtle">
            <div className="d-flex justify-content-end align-items-end">
                <p>Add client to the system</p>
                <button className="button" onClick={toggleNewClient}>
                    {showNewClient ? '-' : '+'}
                </button>
            </div>
            {showNewClient && (
                <div className="mb-4">
                    <NewClient userID={userID}/>
                </div>
            )}
            <h6 className="noto-sans-upper"> all clients </h6>
            <AllClients />
        </div>
    )
}

export default Clients