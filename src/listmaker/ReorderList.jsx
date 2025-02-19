import { reset_reorder_mode, set_reorder_mode } from "../store/actions/ui";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

function ReorderList ({ reset_reorder_mode, set_reorder_mode, isReorderMode }) {

    const handleReorder = () => {
        if (isReorderMode) {
            reset_reorder_mode()
        } else {
            set_reorder_mode();
        }
    }
    
    return (
        <Button 
            className="drop-shadow-sm hover:!bg-[#3a528a] !h-[40px]" 
            onClick={handleReorder}
            style={{ backgroundColor: isReorderMode ? "green" : "#4d6cb2", color: "white" }}
            size='tiny'
        >
            {isReorderMode ? 
                <div>
                    <i className="check circle icon"/> CONFIRM REORDER 
                </div> 
            : 
                <div>
                    <i className="sort icon"/> REORDER 
                </div>
            }
        </Button>
    )
}

const mapStateToProps = (state) => ({
    isReorderMode: state.ui.isReorderMode,
});

export default connect(mapStateToProps, { set_reorder_mode, reset_reorder_mode })(ReorderList);
