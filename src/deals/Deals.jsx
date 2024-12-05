import AllDeals from "./AllDeals";
import NewDeal from "./NewDeal";
import { connect } from "react-redux";

function Deals () {

    return (
        <>
            <NewDeal />
            <AllDeals />
        </>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
});

export default connect(mapStateToProps, {})(Deals);