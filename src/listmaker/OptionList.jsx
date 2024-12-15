import { useEffect, useCallback } from "react";
import { Divider, List, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import UpdateOption from "./UpdateOption";
import { load_options, update_options_order } from "../actions/listmaker";
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import DeleteOption from "./DeleteOption";

function OptionList({ options, load_options, list, update_options_order, isReorderMode }) {
    const formatDate = (datetimeStr) => {
        const dateObj = new Date(datetimeStr);
        return dateObj.toLocaleString('default', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        }).replace(',', '/');
    };

    useEffect(() => {
        load_options(list.id);
    }, [load_options, list]);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        height: "4rem",
        margin: `0 0 ${grid}px 0`,
        padding: "1rem",
        background: isDragging ? "#5F85DB" : "#90B8F8",
        // border: "solid .25rem",
        borderRadius: "1rem", 
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "white" : "white",
        padding: grid,
        height: "12rem"
    });

    const onDragEnd = useCallback((result) => {
        if (!result.destination) return;

        const reorderedItems = reorder(
            options,
            result.source.index,
            result.destination.index
        );

        update_options_order(reorderedItems);
    }, [options, update_options_order]);

    const renderOption = (option) => (
        <div key={option.id} className="flex justify-between items-center">
            <div className="flex flex-row items-center justify-center">
                <Popup
                    content={
                        <List>
                            {option.price === null ? (
                                <p>No details added yet.</p>
                            ) : (
                                <>
                                    <List.Item>${option.price}</List.Item>
                                    <List.Item>Unit {option.unit_number}</List.Item>
                                    <List.Item>{option.layout}; {option.sq_ft} sq. ft.</List.Item>
                                    <List.Item>Available: {formatDate(option.available)}</List.Item>
                                    <List.Item>{option.notes}</List.Item>
                                </>
                            )}
                        </List>
                    }
                    trigger={<i className="ellipsis horizontal icon text-center"></i>}
                />
                <h4 className="pl-2 mt-1">{option.prop_name}</h4>
            </div>
            <div className="flex justify-center">
                <UpdateOption option={option} />
                <DeleteOption option={option} />
            </div>
        </div>
    );

    return (
        <div className="overflow-y-auto">
            {options.length > 0 ? (
                isReorderMode ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="options" >
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    {options.map((option, index) => (
                                        <Draggable key={option.id} draggableId={String(option.id)} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                >
                                                    {renderOption(option)}
                                                    <Divider />
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
                    <div className="h-[19rem] overflow-y-scroll">
                        {options.map((option) => (
                            <div key={option.id} className="p-1">
                                {renderOption(option)}
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
