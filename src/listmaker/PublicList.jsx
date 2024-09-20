import { useEffect } from "react";
import { connect } from "react-redux";
import MapBox from "./MapBox";
import { useParams } from "react-router-dom";
import { retrieve_list } from "../actions/listmaker";
import { set_client_view } from "../actions/ui"
import { Icon, Divider, ListItem, List } from "semantic-ui-react";

function PublicList({ retrieve_list, retrlist, isClientView, set_client_view }) {
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
        set_client_view()
        retrieve_list(uuid)
    }, [uuid, retrieve_list, set_client_view])
   
    return (
        <div className="d-flex flex-column">
            {isClientView && retrlist !== null ? (
                <>
                    <div className="navbar_list p-5">
                        <h2 className="text-center text-white">{retrlist.client_name}</h2>
                    </div>
                    <div className="d-flex flex-column flex-md-row flex-sm-column p-3 align-items-start">
                        <div className="w-100 p-3">
                            <MapBox retr_options={retrlist.options}/>
                        </div>
                        <div className="p-3 overflow-y-scroll w-100" style={{ height: "46rem", maxWidth: "40rem"}}>  
                            <List className="list-group">
                                {retrlist.options.map(option => (
                                    <div className="mb-4 rounded-4">   
                                        <ListItem className="d-flex flex-row justify-content-between list-group-item navbar_list pt-3 text-white">
                                            <h4 className="">{option.prop_name}</h4>
                                            <a href={`https://${option.website}`} target="_blank" rel="noopener noreferrer">
                                                <Icon name="external alternate" />
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
                    </div>
                    <div className='p-5 d-flex flex-column text-center'>
                        <p className="text-white">Prepared by {retrlist.agent_name}</p>
                        <p className="text-white">{formatDate(retrlist.date)}</p>
                    </div>
                </>
            )
            :
            (
                <>
                </>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    retrlist: state.listmaker.retrlist,
    isClientView: state.ui.isClientView
});

export default connect(mapStateToProps, { retrieve_list, set_client_view })(PublicList);