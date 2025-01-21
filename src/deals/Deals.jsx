import AllDeals from "./AllDeals";
import NewDeal from "./NewDeal";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { refresh_token, load_user } from "../store/actions/auth";
import { load_deals } from "../store/actions/agent";

function Deals ({ access, refresh, refresh_token, user, load_user, load_deals }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!access && !refresh) {
            navigate('/login/');
        } else if (refresh && !access) {
            refresh_token();
        } else if (!user) {
            load_user();
        }
    }, [access, refresh, user, load_user, navigate, refresh_token]);
    
    useEffect(() => {
        if (user) {
            load_deals(user.id);
        }
    }, [user, load_deals]);

    
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
    user: state.auth.user

});

export default connect(mapStateToProps, { refresh_token, load_user, load_deals })(Deals);