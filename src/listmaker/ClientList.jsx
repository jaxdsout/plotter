import { useEffect, useState } from "react";
import { connect } from "react-redux";
import MapBox from "./MapBox";
import { useParams } from "react-router-dom";
import { retrieve_list } from "../actions/listmaker";

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
        retrieve_list(uuid)
        /*
        load_user(:id)
        */
    }, [retrieve_list, uuid])

    console.log(retrlist)
    console.log(isClientView, "isclientview")

    return (
        <div className="">
            {isClientView ? (
                <>
                    <div className="navbar p-5 bg-body-secondary">
                        <p>{retrlist.client_name}</p>
                    </div>
                    <div className="row container p-5">
                        <div className="col-md">
                                <ul class="list-group hover">
                                    {retrlist.options.map(option => (
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
                        
                        </div>
                        <div className="col-md">
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
    isClientView: state.listmaker.isClientView
});

export default connect(mapStateToProps, { retrieve_list })(ClientList);