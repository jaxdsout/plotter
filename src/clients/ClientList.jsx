import axios from "axios";
import { useEffect, useState } from "react";
import MapBox from "../components/MapBox";

function ClientList() {
    const [listOptions, setListOptions] = useState([]);

    return (
        <>
            <div className="navbar p-5 bg-body-secondary">
                <p>Client Name</p>
            </div>
            <div className="row container">
                <div className="col-md-6">
                    {listOptions > 0 ? (
                        <ul class="list-group hover">
                            {listOptions.map(option => (
                                <li class="list-group-item" key={option.id}>
                                    <div className="d-flex justify-content-between">
                                        <p>{option.prop_name}</p>
                                        <p>${option.price}</p>
                                        <p>{option.unit_number}</p>
                                        <p>{option.layout} | {option.sq_ft}</p>
                                        <p>Date Available: {option.available}</p>
                                        <p>Notes / Specials:</p>
                                        <p>{option.notes}</p>
                                    </div>  
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading options...</p>
                    )}
                </div>
                <div className="col-md-6">
                    <MapBox />
                </div>
            </div>
        </>
    )
}

export default ClientList;