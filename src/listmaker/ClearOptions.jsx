import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { clear_options } from "../actions/listmaker";

function ClearOptions ({ clear_options, list }) {

    const handleClearOptions = (e) => {
        e.preventDefault();
        clear_options(list.id); 
    };

    return (
        <>
            <Button type='submit' color='black' onClick={handleClearOptions}>CLEAR LIST</Button>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userID: state.auth.user.id,
    error: state.auth.error,
    client_results: state.listmaker.client_results,
    list: state.listmaker.list
});

export default connect(mapStateToProps, { clear_options })(ClearOptions);