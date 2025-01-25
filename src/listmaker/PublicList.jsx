import { useEffect } from "react";
import { connect } from "react-redux";
import MapBox from "./MapBox";
import { useParams } from "react-router-dom";
import { retrieve_list } from "../store/actions/listmaker";
import { set_client_view } from "../store/actions/ui"
import { Icon, Image, Popup, GridColumn, GridRow } from "semantic-ui-react";

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
        }).replace('', '');
    };

    useEffect(() => {
        set_client_view()
        retrieve_list(uuid)
    }, [uuid, retrieve_list, set_client_view])

    console.log(retrlist)
   
    return (
        <>
            {isClientView && retrlist !== null ? (
                <div className="flex flex-col items-center">
                    <div className="w-11/12 max-w-[800px] p-5 mt-5 bg-[#26282B] shadow-inner shadow-md rounded-lg">
                        <h2 className="text-center text-white">{retrlist.client_name}</h2>
                    </div>
                    <div className="w-11/12 max-w-[800px] p-5 mt-5 bg-white flex flex-col lg:flex-row sm:flex-col items-center shadow-inner shadow-md rounded-lg">
                        <div className="p-6">
                            <MapBox retr_options={retrlist.options}/>
                        </div>
                        <div className="p-3 overflow-y-auto w-full">  
                            <ul>
                                {retrlist.options.map(option => (
                                    <li className='p-5 mb-2 rounded-md shadow-inner shadow-md font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-[#26282B] even:bg-[#232425]' key={option.id}>   
                                            <div className="flex flex-row items-start justify-between">
                                                <p className="text-xl mr-3">{option.prop_name}</p>
                                                <a href={`https://${option.website}`} target="_blank" rel="noopener noreferrer">
                                                        <Icon name="building" className="!text-xl" />
                                                </a>
                                            </div>
                                            <div className="flex flex-row items-start justify-between -mt-4 mb-3">
                                                <p className="text-xl">${Math.round(option.price)}</p>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <div className="font-light">
                                                    <p className="-mb-1">Unit {option.unit_number}</p>
                                                    <p className="-mb-1">{option.layout} | {option.sq_ft} sq. ft.</p>
                                                    <p className="mb-0">Available: {option.available}</p>
                                                </div>
                                                <div className="flex items-end mb-2">
                                                {!option.notes ? (
                                                        <></>
                                                    ) :(
                                                        <Popup
                                                            trigger={<Icon name='sticky note' />}
                                                        content={<p>{option.notes}</p>} />
                                                    )}
                                                </div>
                                            </div>
                                         
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='w-11/12 max-w-[800px] p-5 mb-10 mt-5 bg-white shadow-inner shadow-md rounded-lg flex flex-row items-center justify-center '>
                        <GridRow>
                            <GridColumn floated='right' textAlign='right'>
                                <Popup
                                hoverable="false"
                                trigger={                                    
                                    <Image src={retrlist.agent_avatar} size='tiny' circular className="drop-shadow-md !shadow-inner border-2"/>
                                }
                                content={
                                    <div>
                                        {retrlist.agent_phone ? (
                                            <p><b>Phone:</b> <a href={`tel:${retrlist.agent_phone}`}>{retrlist.agent_phone}</a></p>
                                        ) : (
                                            <></>
                                        )}
                                        {retrlist.agent_email ? (
                                            <p><b>Email:</b> <a href={`mailto:${retrlist.agent_email}`}>{retrlist.agent_email}</a></p>
                                        ) : (
                                            <></>
                                        )}
                                    </div>   
                                }
                                position='right center'
                                />
                            </GridColumn>
                        </GridRow>
                        <div className="text-left ml-6">
                            <p className="text-black">Prepared by <b>{retrlist.agent_name}</b></p>
                            <p className="text-black -mt-2">{formatDate(retrlist.date)}</p>
                        </div>
                        
                    </div>
                </div>
            )
            :
            (
                <>
                </>
            )}
        </>
    )
}

const mapStateToProps = state => ({
    retrlist: state.listmaker.retrlist,
    isClientView: state.ui.isClientView
});

export default connect(mapStateToProps, { retrieve_list, set_client_view })(PublicList);