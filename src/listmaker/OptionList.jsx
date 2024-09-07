import { useEffect } from "react";
import {ReactComponent as Trash} from '../components/trash.svg'
import {ReactComponent as Edit} from '../components/pencil-square.svg'
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { useState } from "react";
import UpdateOption from "./UpdateOption";
import { delete_option, load_options, update_options_order } from "../actions/listmaker";
import { Icon, Popup } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function OptionList ({ options, load_options, delete_option, list, update_options_order }) {
    const [editID, setEditID] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleUpdate = (e, optionID) => {
        e.preventDefault();
        if (editID === optionID) {
            setEditID(null)
        } else {
            setEditID(optionID);
        }
    };

    const handleDeleteConfirm = (e, optionID) => {
        e.preventDefault();
        setDeleteConfirm(optionID)
    };
    
    const handleDelete = (e, optionID, list) => {
        e.preventDefault();
        delete_option(optionID, list.id);
        setDeleteConfirm(null)
        load_options(list.id)
    };

    const closeForm = () => {
        setEditID(null);
    };
    
    useEffect(() => {
        load_options(list);
    }, [load_options, list])

    setTimeout(() => {
        if (deleteConfirm > 0) {
            setDeleteConfirm(null)
        }
    }, 7000)


    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedItems = Array.from(options);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);
        update_options_order(reorderedItems);
    };


    return (
        <div>
            {options.length > 0 ? (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="options">
                        {(provided) => (
                            <ul className="list-group" {...provided.droppableProps} ref={provided.innerRef}>
                                {options.map((option, index) => (
                                    <Draggable key={option.id} draggableId={option.id.toString()} index={index}>
                                        {(provided) => (
                                            <li
                                                className="list-group-item pb-3 pt-3"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <h4>{option.prop_name}</h4>
                                                        {editID === option.id ? (
                                                            <></>
                                                        ) : (
                                                            <Popup
                                                                content={
                                                                    <div>
                                                                        <ul className="list-group">
                                                                            {option.price === null ? (
                                                                                <p>No details added yet.</p>
                                                                            ) : (
                                                                                <>
                                                                                    <li className="list-group-item">${option.price}</li>
                                                                                    <li className="list-group-item">Unit {option.unit_number}</li>
                                                                                    <li className="list-group-item">{option.layout}</li>
                                                                                    <li className="list-group-item">{option.sq_ft} sq. ft.</li>
                                                                                    <li className="list-group-item">Available: {option.available}</li>
                                                                                    <li className="list-group-item">{option.notes}</li>
                                                                                </>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                }
                                                                trigger={<Icon name="info circle" />}
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        {editID === option.id ? (
                                                            <Button type="submit" color="black" onClick={(e) => handleUpdate(e, option.id)}>
                                                                <Edit />
                                                            </Button>
                                                        ) : (
                                                            <Button type="submit" onClick={(e) => handleUpdate(e, option.id)}>
                                                                <Edit />
                                                            </Button>
                                                        )}
                                                        {deleteConfirm === option.id ? (
                                                            <Popup
                                                                content="ARE YOU SURE?"
                                                                open
                                                                position="top center"
                                                                trigger={
                                                                    <Button
                                                                        type="submit"
                                                                        color="red"
                                                                        onClick={(e) => handleDelete(e, option.id, list)}
                                                                    >
                                                                        <Trash />
                                                                    </Button>
                                                                }
                                                            />
                                                        ) : (
                                                            <Button type="submit" onClick={(e) => handleDeleteConfirm(e, option.id)}>
                                                                <Trash />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                                {editID === option.id && (
                                                    <UpdateOption option={option} list={list} closeForm={closeForm} />
                                                )}
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : (
                <div className="container text-center">
                    <p>No options added yet.</p>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    options: state.listmaker.options,
    list: state.listmaker.list,
});

export default connect(mapStateToProps, { delete_option, load_options, update_options_order })(OptionList);