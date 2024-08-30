import { useEffect } from "react";
import {ReactComponent as Trash} from '../components/trash.svg'
import {ReactComponent as Edit} from '../components/pencil-square.svg'
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { useState } from "react";
import UpdateOption from "./UpdateOption";
import { delete_option, load_options } from "../actions/listmaker";

function OptionList ({ options, load_options, delete_option, listID }) {
    const [optionEnabled, setOptionEnabled] = useState(false);

    const handleDelete = (e, optionID) => {
        e.preventDefault();
        delete_option(optionID);
        load_options(listID);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (optionEnabled) {
            setOptionEnabled(false)
        } else {
            setOptionEnabled(true);
        }
    };

    useEffect(() => {
        load_options(listID);
        console.log(options, "options")

    }, [])

    return (
        <>
          {options ? (
                <ul class="list-group hover">
                    {options.map(option => (
                        <li class="list-group-item" key={option.id}>
                            <div className="d-flex justify-content-between">
                                <p>{option.prop_name}</p>
                                <div>
                                    <Button onClick={(e) => handleUpdate(e)}>
                                        <Edit />
                                    </Button>
                                    <Button onClick={(e) => handleDelete(e, option.id)}>
                                        <Trash />
                                    </Button>
                                </div>
                            </div>
                            {optionEnabled ? (
                                <UpdateOption 
                                    option={option} 
                                />
                            ) : (
                                null
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
    options: state.listmaker.options.options,
    listID: state.listmaker.list.id,
});

export default connect(mapStateToProps, { delete_option, load_options })(OptionList);