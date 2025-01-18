import { Button, Loader, Icon, Popup } from "semantic-ui-react"
import { connect } from "react-redux";
import { load_properties } from "../store/actions/agent";
import { useEffect } from "react";
import PropertySearch from "../listmaker/PropertySearch";
import { Link } from "react-router-dom";
import { useState } from "react";
import { reset_prop } from "../store/actions/listmaker";


function Commission ({load_properties, properties, user, property, reset_prop}) {
    const [propSel, setPropSel] = useState(null);
    const handleCommSearchReset = () => {
        reset_prop();
        setPropSel(null)
    }

    useEffect(() => {
        if(user) {
            load_properties();
        }

        if (property) {
            setPropSel(true);
        }

    }, [load_properties, user, property])
    
    console.log(property, "search prop 2")
    return (
        <div className="w-11/12 mt-5 mb-10 flex flex-col items-center justify-center bg-[#26282B] rounded-lg shadow-md shadow-inner">
            <div className="mt-4 mb-2 flex flex-col items-center">
                <h4 className='text-center text-white'>Commissions</h4>
            </div>
            <div className="">
                <div>
                    <div className="flex flex-row justify-center items-center p-3">
                        <PropertySearch />
                        {propSel && property !== null ? (
                            <Button size="tiny" color="black" onClick={handleCommSearchReset} className="!ml-5">RESET</Button>
                        ) : (
                            <>
                            </>
                        )}                    
                    </div>
                </div>
                <div>
                    <div className="overflow-y-auto min-h-[24rem] max-h-[30rem] mt-3 pr-10 pl-10">
                        {properties.length > 0 ? (
                            <div className="!p-5">
                            <table className="w-full">
                                <thead className="text-gray-500 bg-[#1f2124] text-xs">
                                    <th className="text-left p-2">Property</th>
                                    <th className="text-left p-2">Send</th>
                                    <th className="text-left p-2">Escort</th>
                                    <th className="text-left text-nowrap p-2">Flat Fee</th>
                                    <th className="text-left p-2">Updated</th>
                                </thead>
                                <tbody>
                                    {property ? (
                                        <>
                                            <tr className="font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#232425]">
                                                <td className="p-2 pr-4 md:pr-12">
                                                    <div>
                                                        <a href={`http://${property.website}`} target="_blank" rel="noopener noreferrer">{property.name}</a>
                                                        <p className="text-xs text-gray-500 text-nowrap">{property.address} | {property.neighborhood}</p>
                                                    </div>
                                                </td>
                                                <td className="p-2">{property.commission.send}%</td>
                                                <td className="p-2">{property.commission.escort}%</td>
                                                <td className="p-2">${property.commission.flat_fee}</td>
                                                <td className="p-2 text-center">
                                                    <Popup
                                                        className="!text-xs"
                                                        content={property.commission.updated_date}
                                                        trigger={ <Icon name="info circle icon" className="text-xs !text-gray-500" />}
                                                    /> 
                                                </td>
                                            </tr>
                                        </>
                                    ) : (
                                        <>
                                            {properties.map(property => (
                                                <tr key={property.id} className="font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#232425]">
                                                    <td className="p-2 pr-4 md:pr-12">
                                                        <div>
                                                            <a href={`http://${property.website}`} target="_blank" rel="noopener noreferrer">{property.name}</a>
                                                            <p className="text-xs text-gray-500 text-nowrap">{property.address} | {property.neighborhood}</p>
                                                        </div>
                                                    </td>
                                                    <td className="p-2">{property.commission.send}%</td>
                                                    <td className="p-2">{property.commission.escort}%</td>
                                                    <td className="p-2">${property.commission.flat_fee}</td>
                                                    <td className="p-2 text-center">
                                                        <Popup
                                                            className="!text-xs"
                                                            content={property.commission.updated_date}
                                                            trigger={ <Icon name="info circle icon" className="text-xs !text-gray-500" />}
                                                        /> 
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                            </div>
                            ) : (
                                <div className="text-center text-white">
                                    <Loader />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.auth.error,
    properties: state.agent.properties,
    property: state.listmaker.property
})

export default connect(mapStateToProps, { load_properties, reset_prop })(Commission);