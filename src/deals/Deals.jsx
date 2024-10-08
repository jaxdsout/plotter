import AllDeals from "./AllDeals";
import NewDeal from "./NewDeal";
import { connect } from "react-redux";

function Deals () {

    return (
        <div className="container pt-5 pb-5 bg-body-tertiary rounded-4">
            <NewDeal />
            <AllDeals />
    </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
});

export default connect(mapStateToProps, {})(Deals);