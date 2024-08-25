import NewClient from "./NewClient"
import AllClients from "./AllClients"
import ClientDetail from './ClientDetail'
import { useState } from "react";
import axios from "axios";


function Clients ({ userID }) {
    const [clients, setClients] = useState([])

    const all_clients = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/clients/`, config);
            setClients(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container pt-5 pb-5 bg-dark-subtle">
            <NewClient userID={userID} all_clients={all_clients}/>
            <h6 className="noto-sans-upper"> all clients </h6>
            <AllClients all_clients={all_clients} clients={clients}/>
        </div>
    )
}

export default Clients