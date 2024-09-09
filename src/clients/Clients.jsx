import NewClient from "./NewClient"
import AllClients from "./AllClients"
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Clients ({ isAuthenticated }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login/')
        }
    }, [isAuthenticated, navigate])

    return (
        <div className="container pt-5 pb-5 bg-dark-subtle">
            <NewClient />
            <AllClients />
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
});

export default connect(mapStateToProps, { })(Clients);