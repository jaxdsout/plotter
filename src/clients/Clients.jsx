import NewClient from "./NewClient";
import AllClients from "./AllClients";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { refresh_token, load_user } from "../store/actions/auth";
import { load_clients } from "../store/actions/agent";

function Clients({ refresh, access, refresh_token, user, load_user, load_clients, clients }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!access && !refresh) {
            navigate('/login/');
        } 
    }, [access, refresh, navigate]);

    useEffect(() => {
        if (!user) {
            refresh_token();
            load_user();
        }
    }, [user, refresh_token, load_user])
    
    useEffect(() => {
        if (user && clients?.length === 0) {
            load_clients(user.id);
        }
    }, [user, load_clients, clients]);

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

export default connect(mapStateToProps, { refresh_token, load_user, load_clients })(Clients);
