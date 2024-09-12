import { useEffect, useCallback } from "react";
import { Divider, List, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import UpdateOption from "./UpdateOption";
import { load_options, update_options_order } from "../actions/listmaker";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeleteOption from "./DeleteOption";
import { ReactComponent as InfoSquare } from '../components/info-square.svg';


function OptionList({ options, load_options, list, update_options_order }) {

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

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",      
        background: isDragging ? "lightblue" : "white",
        position: isDragging ? "fixed" : "static",
        top: isDragging ? draggableStyle?.transform?.split(",")[1] : "auto",
        left: isDragging ? draggableStyle?.transform?.split(",")[0] : "auto",

        transform: isDragging ? draggableStyle?.transform : "none",
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightgrey" : "white",
    });

    const onDragEnd = useCallback((result) => {
        if (!result.destination) {
          return;
        }
    
        const reorderedItems = reorder(
          options,
          result.source.index,
          result.destination.index
        );
    
        update_options_order(reorderedItems);
      }, [options, update_options_order]);

    return (
        <>
            {options.length > 0 ? (
                <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="options">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                        {options.map((option, index) => (
                            <Draggable key={option.id} draggableId={String(option.id)} index={index} className="mt-4 mb-4">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex flex-row align-items-end mb-4">
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
                                                    trigger={<InfoSquare/>}
                                                />
                                                <h4 className="ms-2">{option.prop_name}</h4>
                                            </div>
                                            <div className="d-flex">
                                                <UpdateOption option={option} />
                                                <DeleteOption option={option} />
                                            </div>
                                        </div>
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
                <div className="container text-center">
                    <p>No options added yet.</p>
                </div>
            )}
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    options: state.listmaker.options,
    list: state.listmaker.list,
});

export default connect(mapStateToProps, { load_options, update_options_order })(OptionList);
