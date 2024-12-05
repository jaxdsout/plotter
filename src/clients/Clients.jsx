import NewClient from "./NewClient";
import AllClients from "./AllClients";
import { connect } from "react-redux";

function Clients() {

    return (
        <>
            <NewClient />
            <AllClients />
        </>
    );
}

const mapStateToProps = state => ({
    error: state.auth.error,
});

export default connect(mapStateToProps, {})(Clients);
