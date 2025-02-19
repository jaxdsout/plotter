import { Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import OptionDetail from "./OptionDetail";
import { set_option_order } from "../store/actions/listmaker";

function OptionList({ options, isReorderMode, set_option_order }) {
    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        height: "3.5rem",
        margin: `0 0 ${grid}px 0`,
        padding: "1rem",
        background: isDragging ? "#4d6cb2" : "#90B8F8",
        color: isDragging ? "white" : "black",
        boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "static",
        borderRadius: "1rem", 
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "#bfbfbf" : "#dbdbdb",
        padding: "3.5rem",
        height: "full",
        width: "full",
        position: "relative",
        borderRadius: "2rem",
    });

    const handleDragEnd = (result) => {
        if (!result.destination) return;
    
        const updatedOptions = Array.from(options);
        const [movedOption] = updatedOptions.splice(result.source.index, 1);
        updatedOptions.splice(result.destination.index, 0, movedOption);

        set_option_order(updatedOptions);
    };

    return (
        <div className="overflow-y-auto">
            {options?.length > 0 ? (
                isReorderMode ? (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="options" >
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                    {options.map((option, index) => (
                                        <Draggable key={option.id} draggableId={String(option.id)} index={index}>
                                            {(provided, snapshot) => (
                                                <div className="flex flex-row items-center">
                                                    {snapshot.isDragging ? <span className="mont mr-3">{index+1}.</span>: <span className="mont mr-3">{index+1}.</span> }
                                                    <div className="w-full hover:!bg-[#4d6cb2]" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                    >
                                                        <OptionDetail option={option}/>
                                                    </div>
                                                </div>
                                           
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    <div className="overflow-y-auto bg-[#dbdbdb] rounded-xl p-6 drop-shadow-md">
                        {options.map((option) => (
                            <div key={option.id} className="p-1">
                                <OptionDetail option={option}/>
                                <Divider className=""/>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div className="container text-center">
                    <p>No options added yet.</p>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    error: state.auth.error,
    isReorderMode: state.ui.isReorderMode,
    options: state.listmaker.options
});

export default connect(mapStateToProps, { set_option_order })(OptionList);
