import NewList from "../listmaker/NewList"
import AllLists from "./AllLists";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";


function Lists ({ isAuthenticated }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login/')
        }
    }, [isAuthenticated, navigate])

    return (
        <div className="container pt-5 pb-5 bg-dark-subtle">
            <NewList />
            <AllLists />
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
});

export default connect(mapStateToProps, { })(Lists);