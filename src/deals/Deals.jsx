import AllDeals from "./AllDeals";
import NewDeal from "./NewDeal";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function Deals ({ isAuthenticated }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login/');
        }
    }, [isAuthenticated, navigate]);
    
    return (
        <>
            <NewDeal />
            <AllDeals />
        </>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Deals);