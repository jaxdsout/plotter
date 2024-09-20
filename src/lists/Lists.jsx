import NewList from "../listmaker/NewList"
import AllLists from "./AllLists";
import { connect } from "react-redux";

function Lists () {

    return (
        <div className="container pt-5 pb-5 bg-body-tertiary rounded-4">
            <NewList />
            <AllLists />
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
});

export default connect(mapStateToProps, { })(Lists);