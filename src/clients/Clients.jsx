import NewClient from "./NewClient";
import AllClients from "./AllClients";
import { connect } from "react-redux";
import { load_user } from "../store/actions/auth";
import { load_clients } from "../store/actions/agent";

function Clients( ) {
    
    return (
        <>
            <NewClient />
            <AllClients />
        </>
    );
}

const mapStateToProps = state => ({
    error: state.auth.error,
    access: state.auth.access,
    refresh: state.auth.refresh,
    user: state.auth.user,
    clients: state.agent.clients
});

export default connect(mapStateToProps, { load_user, load_clients })(Clients);
