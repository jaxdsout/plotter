import NewList from "../listmaker/NewList"
import AllLists from "./AllLists";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function Lists ({ isAuthenticated }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <NewList />
            <AllLists />
        </>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { })(Lists);