import { reset_reorder_mode, set_reorder_mode } from "../actions/ui";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

function ReorderList ({ reset_reorder_mode, set_reorder_mode, isReorderMode }) {

    const handleReorder = () => {
        if (isReorderMode) {
            reset_reorder_mode()
            console.log("re order mode disabled")
        } else {
            set_reorder_mode();
        }
        console.log("re order mode activated")
    }
    
    return (
        <>
        <Button 
            className="drop-shadow-sm" 
            onClick={handleReorder}
            color={isReorderMode ? "red" : "teal"}
        >
            {isReorderMode ? "CONFIRM" : "REORDER"}
        </Button>
        </>
    )
}

const mapStateToProps = (state) => ({
    isReorderMode: state.ui.isReorderMode,
});

export default connect(mapStateToProps, { set_reorder_mode, reset_reorder_mode })(ReorderList);