import { useEffect } from "react";
import { connect } from "react-redux";
import MapBox from "./MapBox";
import { useParams } from "react-router-dom";
import { retrieve_list } from "../actions/listmaker";
import { set_client_view } from "../actions/ui"
import { Icon } from "semantic-ui-react";

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
        <div className="flex flex-col items-center">
            {isClientView && retrlist !== null ? (
                <>
                    <div className="w-3/4 max-w-[800px] p-5 mt-5 bg-[#26282B] shadow-inner shadow-md rounded-lg">
                        <h2 className="text-center text-white">{retrlist.client_name}</h2>
                    </div>
                    <div className="flex flex-col md:flex-row sm:flex-col p-3 items-center md:items-start">
                        <div className="p-3">
                            <MapBox retr_options={retrlist.options}/>
                        </div>
                        <div className="p-3 overflow-y-auto max-w-[40rem] h-[37rem]">  
                            <ul className='divide-y'>
                                {retrlist.options.map(option => (
                                    <li className='p-3 w-[26rem] md:w-[18rem] flex flex-col rounded-md shadow-inner shadow-md mb-1 justify-evenly items-start font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-[#26282B] even:bg-[#232425]' key={option.id}>   
                                        <div>
                                            <div className="flex flex-row items-start justify-start">
                                                <h4 className="pr-3">{option.prop_name}</h4>
                                                <a href={`https://${option.website}`} target="_blank" rel="noopener noreferrer">
                                                    <Icon name="external alternate" />
                                                </a>
                                            </div>
                                            <ul>
                                                <li className="text-xl mb-3">${option.price}</li>
                                                <li>Unit {option.unit_number}</li>
                                                <li>{option.layout} | {option.sq_ft} sq. ft.</li>
                                                <li>Available: {option.available}</li>
                                                {!option.notes ? (
                                                    <></>
                                                ) :(
                                                    <li className="mt-2">{option.notes}</li>
                                                )}
                                            </ul>
                                        </div>
                                    
                                        
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='w-3/4 max-w-[800px] p-5 mb-10 mt-5 bg-white shadow-inner shadow-md rounded-lg flex items-center flex-col'>
                        <p className="text-black">Prepared by {retrlist.agent_name}</p>
                        <p className="text-black">{formatDate(retrlist.date)}</p>
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