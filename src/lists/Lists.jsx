import NewList from "../listmaker/NewList"
import AllLists from "./AllLists";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { refresh_token, load_user } from "../store/actions/auth";
import { load_lists } from "../store/actions/agent";

function Lists ({ access, refresh, refresh_token, user, load_user, load_lists, lists }) {
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
        if (user && lists?.length === 0) {
            load_lists(user.id);
        }
    }, [user, load_lists, lists]);

    return (
        <>
            <NewList />
            <AllLists />
        </>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    access: state.auth.access,
    refresh: state.auth.refresh,
    user: state.auth.user,
    lists: state.agent.lists
});

export default connect(mapStateToProps, { refresh_token, load_user, load_lists })(Lists);