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
    const [sortConfig, setSortConfig] = useState({ key: 'send', direction: 'desc' });
    const [sortedProperties, setSortedProperties] = useState(properties);

    const handleCommSearchReset = () => {
        reset_prop();
        setPropSel(null)
    }

    const sortProperties = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        if(user) {
            load_properties();
        }

        if (property) {
            setPropSel(true);
        }

        const sortedArray = properties.sort((a, b) => {
            if (a.commission[sortConfig.key] < b.commission[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a.commission[sortConfig.key] > b.commission[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        setSortedProperties(sortedArray);

    }, [load_properties, user, property, properties])
    
    console.log(property, "search prop 2")
    return (
        <div className="w-11/12 max-w-[500px] mt-5 mb-10 flex flex-col items-center justify-center bg-[#26282B] rounded-lg shadow-md shadow-inner">
            <div className="mt-4 mb-2 flex flex-col items-center">
                <h4 className='text-center text-white'>Commissions</h4>
            </div>
            <div className="p-5">
                <div className="flex flex-row justify-center items-center p-3">
                    <PropertySearch />
                    {propSel && property !== null ? (
                        <Button size="tiny" color="black" onClick={handleCommSearchReset} className="!ml-5">RESET</Button>
                    ) : (
                        <>
                        </>
                    )}                    
                </div>
                <div className="flex flex-col overflow-y-auto min-h-[24rem] max-h-[30rem] text-left max-w-[480px] mt-3 scroll-ml-12 snap-start">
                    {properties.length > 0 ? (
                        <table className="">
                            <thead className="text-gray-500 bg-[#1f2124] text-xs">
                                <th className="text-left p-2">Property</th>
                                <th className="text-left p-2" onClick={() => sortProperties('send')}>
                                    Send {sortConfig.key === 'send' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="text-left p-2" onClick={() => sortProperties('escort')}>
                                    Escort {sortConfig.key === 'escort' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="text-left text-nowrap p-2" onClick={() => sortProperties('flat_fee')}>
                                    Flat Fee {sortConfig.key === 'flat_fee' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
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
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                        {sortedProperties.map(property => (
                                            <tr key={property.id} className="font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#232425]">
                                                <td className="p-2 pr-4 md:pr-12">
                                                    <div>
                                                        <span>
                                                            <a href={`http://${property.website}`} target="_blank" rel="noopener noreferrer" className="text-sm">{property.name}</a>
                                                            <Popup
                                                                className="!text-xs"
                                                                content={property.commission.updated_date}
                                                                trigger={ <Icon name="info circle icon" className="!text-xs !text-gray-500 !ml-2" />}
                                                            /> 
                                                        </span>
                                                      
                                                        <p className="text-xs text-gray-500 text-nowrap">{property.address} | {property.neighborhood}</p>
                                                    </div>
                                                </td>
                                                <td className="p-2">{property.commission.send}%</td>
                                                <td className="p-2">{property.commission.escort}%</td>
                                                <td className="p-2">${property.commission.flat_fee}</td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                        ) : (
                            <div className="text-center text-white">
                                <Loader />
                            </div>
                        )
                    }
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