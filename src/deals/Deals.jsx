import AllDeals from "./AllDeals";
import NewDeal from "./NewDeal";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { refresh_token, load_user } from "../store/actions/auth";
import { load_deals } from "../store/actions/agent";

function Deals ({ access, refresh, refresh_token, user, load_user, load_deals, deals }) {
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
        if (user && deals?.length === 0) {
            load_deals(user.id);
        }
    }, [user, load_deals, deals]);

    
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

export default connect(mapStateToProps, { refresh_token, load_user, load_deals })(Deals);