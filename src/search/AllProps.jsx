import { Button, Loader, Icon, Popup, Modal, Tab, TabPane } from "semantic-ui-react"
import { connect } from "react-redux";
import { useEffect } from "react";
import PropertySearch from "../components/PropertySearch";
import { useState } from "react";
import { reset_commission } from "../store/actions/ui";
import PropDetail from "./PropDetail";
import MapBox from "../components/MapBox"

function AllProps ({ property, properties, reset_commission }) {
    const [propSel, setPropSel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [tabSwitch, setTabSwitch] = useState('list')

    const handleCommSearchReset = () => {
        reset_commission();
        setPropSel(null)
    }

    const handleOpenModal = (property) => {
        setPropSel(property)
        setShowModal(true);
    };

    const handleCloseModal = async () => {
        setPropSel(null)
        // await reset_list_mode();
        setShowModal(false);
    }

    useEffect(() => {
        if (property !== null) {
            handleOpenModal(property)
        }
    }, [property])


    return (
        <div className="h-[45.9rem] flex flex-col items-center justify-start bg-[#26282B] rounded-lg shadow-md shadow-inner">
            <div className="w-full flex flex-row justify-evenly  items-center mt-5 mb-5 relative">
                <PropertySearch />
                {property !== null && (
                    <div className="ml-5 absolute left-5">
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
                )}
                <div className="flex flex-row items-center bg-gray-200 rounded-lg">
                    <Button onClick={() => setTabSwitch('list')} className="border-2 border-black p-3 text-start">List</Button>
                    <Button onClick={() => setTabSwitch('map')} className="border-2 border-black p-3 text-start">Map</Button>
                </div>                    
            </div>

            <div className="flex flex-col items-center justify-center w-full h-full min-h-[24rem]">
                {tabSwitch === 'list' && (
                    <PropList properties={properties} property={property} handleOpenModal={handleOpenModal} />
                )}
                {tabSwitch === 'map' && (
                    <PropMap />
                )}     
            </div>              
        
            {propSel && (
                <Modal className='!w-11/12 sm:!w-[500px] !mb-10' open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>{propSel?.name}</Modal.Header>
                    <Modal.Content>
                        <PropDetail propSel={propSel} handleCloseModal={handleCloseModal}/>
                    </Modal.Content>
                    <Modal.Actions className="flex justify-end">
                        {/* {isListMode ? (
                            <Button onClick={(() => handleCancelEdit(selectedListID))}>CANCEL</Button>
                        ): ( */}
                            <Button onClick={handleCloseModal}>CLOSE</Button>
                        {/* )} */}
                    </Modal.Actions>
                </Modal>
            )}
        </div>
    )
}

function PropList ({ properties, property, handleOpenModal }) {
    const [sortConfig, setSortConfig] = useState({ key: 'send', direction: 'desc' });
    const [sortedProperties, setSortedProperties] = useState(properties);

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
        console.log('all props firing')
    }, [properties, sortConfig]);

    return (
        <div className="flex flex-col overflow-y-auto overflow-x-hidden text-left mt-3 mb-10 snap-start w-full">            
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
                        {sortedProperties.map(property => (
                            <tr key={property.id} className="font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#232425]">
                                <td className="p-2 pr-4 md:pr-12">
                                    <div className="flex flex-col cursor-pointer" onClick={() => handleOpenModal(property)}>
                                        <p className="text-sm">
                                            {property.name}
                                            <Popup
                                                className="!text-xs"
                                                content={property.commission.updated_date}
                                                trigger={ <Icon name="info circle icon" className="!text-xs !text-gray-500 !ml-2" />}
                                            /> 
                                        </p>
                                        <p className="text-xs text-gray-500 text-nowrap">{property.address} | {property.neighborhood}</p>
                                    </div>
                                </td>
                                <td className="p-1 text-[0.7rem] sm:text-base">{property.commission.send}%</td>
                                <td className="p-1 text-[0.7rem] sm:text-base">{property.commission.escort}%</td>
                                <td className="p-1 text-[0.7rem] sm:text-base">${property.commission.flat_fee}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center text-white">
                    <Loader inverted active />
                </div>
            )}
        </div>
    )
}

function PropMap () {

    return (
        <div>
            <MapBox />
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    properties: state.agent.properties,
    property: state.listmaker.property
})

export default connect(mapStateToProps, { reset_commission })(AllProps);