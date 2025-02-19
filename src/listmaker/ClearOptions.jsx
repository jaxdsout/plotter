import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { clear_options, load_list } from "../store/actions/listmaker";
import { useState } from "react";

function ClearOptions ({ clear_options, list, load_list }) {
    const [clearConfirm, setClearConfirm] = useState(false);

    const handleClearOptions = async (listID) => {
        await clear_options(listID); 
        await load_list(listID);
        setClearConfirm(false)
    };

    const handleConfirmClear = () => {
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
                <Button className="drop-shadow-sm" color='red' size='tiny' onClick={(() => handleClearOptions(list.id))}>
                    <i className="check circle icon"/>CONFIRM CLEAR
                </Button>
            ) : (
                <Button className="drop-shadow-sm text-nowrap hover:!bg-red-500" color='black' size='tiny' onClick={(() => handleConfirmClear())}>
                    <i className="exclamation triangle icon"/>CLEAR LIST
                </Button>
            )}
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    client_results: state.listmaker.client_results,
    list: state.listmaker.list
});

export default connect(mapStateToProps, { clear_options, load_list })(ClearOptions);