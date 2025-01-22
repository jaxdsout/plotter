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
    access: state.auth.access,
    refresh: state.auth.refresh,
    user: state.auth.user,
    deals: state.agent.deals

});

export default connect(mapStateToProps, { })(Deals);