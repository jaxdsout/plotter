import { useEffect, useState } from "react";
import { connect } from "react-redux";
import MapBox from "./MapBox";
import { useParams } from "react-router-dom";
import { retrieve_list } from "../actions/listmaker";
import { set_client_view } from "../actions/ui"
import { Icon, Divider, ListItem, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

function ClientList({ retrieve_list, retrlist, isClientView, set_client_view }) {
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
        set_client_view()
        retrieve_list(uuid)
        console.log("retrived list on clientlist")
    }, [uuid, retrieve_list, set_client_view])
   
    return (
        <div className="d-flex flex-column">
            {isClientView && retrlist !== null ? (
                <>
                    <div className="navbar p-5 bg-body-secondary">
                        <h2>{retrlist.client_name}</h2>
                    </div>
                    <div className="d-flex p-5 justify-content-center">
                        <MapBox retr_options={retrlist.options}/>
                    </div>
                    <Divider/>
                    <div className="p-5">  
                        <List className="list-group">
                            {retrlist.options.map(option => (
                                <div className="mb-4">   
                                    <ListItem className="d-flex flex-row justify-content-between list-group-item bg-secondary-subtle">
                                        <h4>{option.prop_name}</h4>
                                        <a href={`https://${option.website}`} target="_blank" rel="noopener noreferrer">
                                            <Icon name="linkify" />
                                        </a>
                                    </ListItem>
                                    <ListItem className="list-group-item">${option.price}</ListItem>
                                    <ListItem className="list-group-item">Unit {option.unit_number}</ListItem>
                                    <ListItem className="list-group-item">{option.layout} | {option.sq_ft} sq. ft.</ListItem>
                                    <ListItem className="list-group-item">Available: {option.available}</ListItem>
                                    {!option.notes ? (
                                        <></>
                                    ) :(
                                        <li className="list-group-item">{option.notes}</li>
                                    )}
                                </div>
                            ))}
                        </List>
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

export default connect(mapStateToProps, { retrieve_list, set_client_view })(ClientList);