import { useEffect, useState } from "react";
import { connect } from "react-redux";
import MapBox from "./MapBox";
import { useParams } from "react-router-dom";
import { retrieve_list } from "../actions/listmaker";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

function ClientList({ retrieve_list, retrlist, isClientView }) {
    const { uuid } = useParams();

    const formatDate = (datetimeStr) => {
        const dateObj = new Date(datetimeStr);
        return dateObj.toLocaleString('default', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).replace(',', '');
    };

    useEffect(() => {
        console.log(uuid)
        retrieve_list(uuid)
        console.log("retrived list on clientlist")
    }, [uuid, retrieve_list])
   
    return (
        <div className="d-flex flex-column">
            {isClientView && retrlist !== null ? (
                <>
                    <div className="navbar p-5 bg-body-secondary">
                        <h2>{retrlist.client_name}</h2>
                    </div>
                    <div className="d-flex container p-5 justify-content-center">
                        <div className="col-md ps-3 pe-3">
                                <ul class="list-group hover">
                                    {retrlist.options.map(option => (
                                        <div className="">   
                                            <li className="list-group-item">
                                                <h4>{option.prop_name}</h4>
                                                <a href={`https://${option.website}`} target="_blank" rel="noopener noreferrer">
                                                    <Icon name="linkify" />
                                                </a>
                                            </li>
                                            <li className="list-group-item">${option.price}</li>
                                            <li className="list-group-item">Unit {option.unit_number}</li>
                                            <li className="list-group-item">{option.layout} | {option.sq_ft} sq. ft.</li>
                                            <li className="list-group-item">Available: {option.available}</li>
                                            <li className="list-group-item">{option.notes}</li>
                                        </div>
                                    ))}
                                </ul>
                        </div>
                        <div className="col-md ps-3 pe-3">
                            <MapBox retr_options={retrlist.options}/>
                        </div>
                    </div>
                    <div className='navbar p-5 bg-body-secondary'>
                        <p>Prepared by {retrlist.agent_name}</p>
                        <p>{formatDate(retrlist.date)}</p>
                    </div>
                </>

            )
            :
            (
                <></>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    retrlist: state.listmaker.retrlist,
    isClientView: state.ui.isClientView
});

export default connect(mapStateToProps, { retrieve_list })(ClientList);