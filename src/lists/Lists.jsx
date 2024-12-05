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
});

export default connect(mapStateToProps, { })(Lists);