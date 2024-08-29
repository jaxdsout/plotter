import { useEffect } from "react";
import {ReactComponent as Trash} from '../components/trash.svg'
import {ReactComponent as Edit} from '../components/pencil-square.svg'
import { Button } from "semantic-ui-react";
import axios from "axios";
import { useState } from "react";
import UpdateOption from "./UpdateOption";

function OptionList ({ options, all_options, listID }) {
    const [optionEnabled, setOptionEnabled] = useState(false);

    const deleteOption = async (optionID) => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/options/${optionID}/`, config);
            } catch (err) {
                console.error(err);
            }
        }
    };


    const handleDelete = (e, optionID) => {
        e.preventDefault();
        deleteOption(optionID);
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
        all_options();
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
                                    optionID={option.id} 
                                    listID={listID}
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

export default OptionList