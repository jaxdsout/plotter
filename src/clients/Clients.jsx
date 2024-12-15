import NewClient from "./NewClient";
import AllClients from "./AllClients";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function Clients({ isAuthenticated }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <NewClient />
            <AllClients />
        </>
    );
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Clients);
