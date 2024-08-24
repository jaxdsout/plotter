import NewClient from "./NewClient"
import AllClients from "./AllClients"
import ClientDetail from './ClientDetail'
import { useState } from "react";

function Clients () {
    const [showNewClient, setShowNewClient] = useState(false);

    const toggleNewClient = () => {
        setShowNewClient(!showNewClient);
    };

    return (
        <div className="container-sm sm w-50 pt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="noto-sans-upper">Add client to the system</h6>
                <button className="" onClick={toggleNewClient}>
                    {showNewClient ? '-' : '+'}
                </button>
            </div>
            {showNewClient && (
                <div className="mb-4">
                    <NewClient />
                </div>
            )}
            <h6 className="noto-sans-upper"> all clients </h6>
            <AllClients />
        </div>
    )
}

export default Clients