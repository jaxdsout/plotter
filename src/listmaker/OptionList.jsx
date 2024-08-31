import { useEffect } from "react";
import {ReactComponent as Trash} from '../components/trash.svg'
import {ReactComponent as Edit} from '../components/pencil-square.svg'
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { useState } from "react";
import UpdateOption from "./UpdateOption";
import { delete_option, load_options } from "../actions/listmaker";

function OptionList ({ options, load_options, delete_option, list }) {
    const [editID, setEditID] = useState(null);

    const handleUpdate = (e, optionID) => {
        e.preventDefault();
        if (editID === optionID) {
            setEditID(null)
        } else {
            setEditID(optionID);
        }
    };

    const handleDelete = (e, optionID, list) => {
        e.preventDefault();
        delete_option(optionID, list);
    };

    const closeForm = () => {
        setEditID(null);
    };
    
    useEffect(() => {
        load_options(list);
    }, [load_options, list])

    return (
        <>
            {options.length > 0 ? (
                <ul className="list-group hover">
                    {options.map(option => (
                        <li className="list-group-item" key={option.id}>
                            <div className="d-flex justify-content-between">
                                <p>{option.prop_name}</p>
                                <div>
                                    <Button onClick={(e) => handleUpdate(e, option.id)}>
                                        <Edit />
                                    </Button>
                                    <Button onClick={(e) => handleDelete(e, option.id, list)}>
                                        <Trash />
                                    </Button>
                                </div>
                            </div>
                            {editID === option.id && (
                                <UpdateOption 
                                    option={option} 
                                    list={list}
                                    closeForm={closeForm}
                                />
                            )}       
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No options available</p>
            )}
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    options: state.listmaker.options,
    list: state.listmaker.list.id,
});

export default connect(mapStateToProps, { delete_option, load_options })(OptionList);