import NewClient from "./NewClient";
import AllClients from "./AllClients";
import { connect } from "react-redux";

function Clients() {

    return (
        <div className="container pt-5 pb-5 bg-body-tertiary rounded-4">
            <NewClient />
            <AllClients />
        </div>
    );
}

const mapStateToProps = state => ({
    error: state.auth.error,
});

export default connect(mapStateToProps, {})(Clients);
