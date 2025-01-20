import { useEffect, useCallback } from "react";
import { Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { load_options, update_options_order } from "../store/actions/listmaker";
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import OptionDetail from "./OptionDetail";

function OptionList({ options, load_options, list, update_options_order, isReorderMode }) {
    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        height: "5rem",
        margin: `0 0 ${grid}px 0`,
        padding: "1rem",
        background: isDragging ? "teal" : "teal",
        color: "white",
        boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "static",
        borderRadius: "1rem", 
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "white" : "white",
        padding: grid,
        height: "24rem",
        position: "relative"
    });

    const handleDragEnd = (result) => {
        if (!result.destination) return;
    
        const updatedOptions = Array.from(options);
        const [movedOption] = updatedOptions.splice(result.source.index, 1);
        updatedOptions.splice(result.destination.index, 0, movedOption);
    
        update_options_order(updatedOptions);
    };

    useEffect(() => {
        load_options(list.id);
    }, [load_options, list]);

    return (
        <div className="overflow-y-auto">
            {options.length > 0 ? (
                isReorderMode ? (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="options" >
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                    {options.map((option, index) => (
                                        <Draggable key={option.id} draggableId={String(option.id)} index={index}>
                                            {(provided, snapshot) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                >
                                                    <OptionDetail option={option}/>
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
                    <div className="h-[19rem] overflow-y-auto">
                        {options.map((option) => (
                            <div key={option.id} className="p-1">
                                <OptionDetail option={option}/>
                                <Divider />
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
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    options: state.listmaker.options,
    list: state.listmaker.list,
    isReorderMode: state.ui.isReorderMode
});

export default connect(mapStateToProps, { load_options, update_options_order })(OptionList);
