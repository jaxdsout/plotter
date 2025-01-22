import NewList from "../listmaker/NewList"
import AllLists from "./AllLists";
import { connect } from "react-redux";

function Lists () {
    
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

export default connect(mapStateToProps, {})(Lists);