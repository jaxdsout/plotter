
import { all_clients } from "../actions/dash"
import { useEffect } from "react";
import { connect } from "react-redux";

function AllClients ({ clients, all_clients }) {

    useEffect(() => {
        all_clients();
    }, [])

    return (
        <div>
            <h6 className="noto-sans-upper"> all clients </h6>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>{client.first_name} {client.last_name}</li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    clients: state.clients.clients
});

export default connect(mapStateToProps, { all_clients })(AllClients)