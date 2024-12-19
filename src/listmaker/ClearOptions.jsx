import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { clear_options } from "../actions/listmaker";
import { useState } from "react";

function ClearOptions ({ clear_options, list }) {
    const [clearConfirm, setClearConfirm] = useState(false);

    const handleClearOptions = (e) => {
        e.preventDefault();
        clear_options(list.id); 
        setClearConfirm(false)
    };

    const handleConfirmClear = (e) => {
        e.preventDefault();
        setClearConfirm(true)
    };

    setTimeout(() => {
        if (clearConfirm) {
            setClearConfirm(false)
        }
    }, 5000)

    return (
        <>
            {clearConfirm ? (
                <Button className="drop-shadow-sm" type='submit' color='red' onClick={handleClearOptions}>CONFIRM CLEAR LIST</Button>
            ) : (
                <Button className="drop-shadow-sm" type='submit' color='black' onClick={handleConfirmClear}>CLEAR LIST</Button>
            )}
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