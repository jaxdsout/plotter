import { Button, Loader, Icon, Popup } from "semantic-ui-react"
import { connect } from "react-redux";
import { useEffect } from "react";
import PropertySearch from "../components/PropertySearch";
import { useState } from "react";
import { reset_commission } from "../store/actions/ui";


function Rates ({ properties, property, reset_commission}) {
    const [propSel, setPropSel] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'send', direction: 'desc' });
    const [sortedProperties, setSortedProperties] = useState(properties);

    const handleCommSearchReset = () => {
        reset_commission();
        setPropSel(null)
    }

    const sortProperties = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        const sortedArray = [...properties].sort((a, b) => {
            if (a.commission[sortConfig.key] < b.commission[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a.commission[sortConfig.key] > b.commission[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        setSortedProperties(sortedArray);
    }, [properties, sortConfig]);

    useEffect(() => {
        if (property) {
            setPropSel(true);
        }
    }, [property])


    return (
        <>
            <div className="h-[45.9rem] flex flex-col items-center justify-start bg-[#26282B] rounded-lg shadow-md shadow-inner">
                <div className="w-full flex flex-row justify-center items-center mt-5 mb-5 relative">
                    <PropertySearch />
                    {propSel && property !== null ? (
                        <div className="ml-5 absolute right-[19rem]">
                            <Button 
                                size="tiny" 
                                color="red" 
                                inverted 
                                onClick={handleCommSearchReset} 
                                className=""
                            >
                                RESET
                            </Button>
                        </div>
                        
                    ) : null}                    
                </div>
                <div className="flex flex-col overflow-y-auto min-h-[24rem] max-h-full text-left w-11/12 mt-3 mb-10 snap-start">
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
                                <th className="text-left text-wrap sm:text-nowrap p-2" onClick={() => sortProperties('flat_fee')}>
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
                                            <td className="p-1 text-[0.7rem] sm:text-base">{property.commission.send}%</td>
                                            <td className="p-1 text-[0.7rem] sm:text-base">{property.commission.escort}%</td>
                                            <td className="p-1 text-[0.7rem] sm:text-base">${property.commission.flat_fee}</td>
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
                                                <td className="p-1 text-[0.7rem] sm:text-base">{property.commission.send}%</td>
                                                <td className="p-1 text-[0.7rem] sm:text-base">{property.commission.escort}%</td>
                                                <td className="p-1 text-[0.7rem] sm:text-base">${property.commission.flat_fee}</td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                        ) : (
                            <div className="text-center text-white">
                                <Loader inverted active />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    properties: state.agent.properties,
    property: state.listmaker.property
})

export default connect(mapStateToProps, { reset_commission })(Rates);