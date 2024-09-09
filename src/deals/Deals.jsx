import AllDeals from "./AllDeals";
import NewDeal from "./NewDeal";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Deals ({ isAuthenticated, user}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login/')
        }
        if (!user) {
            navigate('/dashboard/home')
        } 
    }, [isAuthenticated, navigate, user])

    return (
        <div className="container pt-5 pb-5 bg-dark-subtle">
            <NewDeal />
            <AllDeals />
    </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    user: state.auth.user
});

export default connect(mapStateToProps, { })(Deals);