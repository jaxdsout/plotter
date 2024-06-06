
import axios from "axios";
import { all_clients } from "../actions/dash"
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ClientDetail from "./ClientDetail";


function AllClients () {
    const [clients, setClients] = useState([])
    const [showClientDetail, setShowClientDetail] = useState(null);

    const all_clients = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/plotter/clients/`, config);
            setClients(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const toggleClientDetail = (id) => {
        setShowClientDetail(showClientDetail === id ? null : id);
    };

    useEffect(() => {
        all_clients();
    }, [])

    return (
        <div>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>
                    <Link onClick={() => toggleClientDetail(client.id)}>
                        {client.first_name} {client.last_name}
                    </Link>
                    {showClientDetail === client.id && (
                        <div>
                            <ClientDetail client={client} />
                        </div>
                    )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default connect(null, {  })(AllClients)