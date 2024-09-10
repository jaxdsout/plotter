import NewList from "../listmaker/NewList"
import AllLists from "./AllLists";
import { connect } from "react-redux";

function Lists () {

    return (
        <div className="container pt-5 pb-5 bg-dark-subtle">
            <NewList />
            <AllLists />
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
});

export default connect(mapStateToProps, { })(Lists);