import { Button, Input, Divider, Form, Popup } from "semantic-ui-react";
import { reset_list_mode, set_list_mode } from "../store/actions/ui";
import { connect } from "react-redux";
import { set_search_client, update_list_options, new_option, set_list_edit, load_list} from "../store/actions/listmaker";
import PropertySearch from "../listmaker/PropertySearch";
import OptionList from "../listmaker/OptionList";
import MapBox from "../listmaker/MapBox";
import ClearOptions from "../listmaker/ClearOptions";
import DeleteList from "./DeleteList";
import ReorderList from "../listmaker/ReorderList";
import ShareURL from "../listmaker/ShareURL";

function ListDetail({ list, property, client, user, set_list_mode, new_option, set_search_client, set_list_edit, handleCloseModal, 
    update_list_options, reset_list_mode, load_list, isReorderMode, isListMode }) {

    const link = `${window.origin}/list/${list.uuid}`

    const formatDate = (datetimeStr) => {
        const dateObj = new Date(datetimeStr);
        return dateObj.toLocaleString('default', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(',', '/');
    };

    const handleEditList = async () => {
        if (user && list) {
            const userID = user.id;
            const name = user.full_name;
            await set_search_client(userID, name)
            set_list_edit(list)
            set_list_mode()
        }
    }


    const handleSaveList = async () => {
        if (list && isListMode && client) {
            await update_list_options(user.id, client.id, list, list.options)
            await reset_list_mode()
            load_list(list.id)
        }
    }

    const handlePropertyAdd = async (list, property) => {
        if (property && list) {
            await new_option(property.id, list.id, client.id);
            load_list(list.id);
        }
    };

    const handleOpenURL = () => {
        if (list.uuid) {
            const fullURL = `${window.location.origin}/list/${list.uuid}`;
            window.open(fullURL, '_blank');
        }
    };

    return(
        <>   
            {isListMode ? (
                <>
                  <div className="flex flex-col justify-evenly">
                    <div className="">
                        <div className="flex flex-row items-center justify-center">
                            <PropertySearch />
                            <Form onSubmit={() => handlePropertyAdd(list, property)}>
                                <Button color="blue" type="submit">ADD PROPERTY</Button>
                            </Form>
                        </div>
                        <Divider />
                        <div>
                            <OptionList options={list.options} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center pt-7 pb-3">
                            <MapBox />
                        </div>
                        <Divider />
                        <div className="flex justify-between items-start">
                            <ClearOptions />
                            <ReorderList />
                            {isReorderMode ? (
                                <>
                                </>
                            ) :(
                                <Button className="drop-shadow-sm" color="green" type="submit" onClick={handleSaveList}>
                                    SAVE LIST
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col justify-evenly items-center">
                        <div className="flex flex-row justify-evenly mb-1">
                            <div className="p-2 mr-2">
                                <p><b>Client: </b>{list.client_name}</p>
                                <p><b>Date Created: </b>{formatDate(list.date)}</p>
                                <p><b>Last Updated: </b></p>
                                <p>
                                    <b className="pr-3">URL: </b>
                                    <Button onClick={handleOpenURL}>
                                        <i className="external alternate icon !-mr-1"></i>
                                    </Button>
                                </p>
                            </div>
                            <div className="flex flex-col justify-evenly items-center">
                                <DeleteList list={list} handleCloseModal={handleCloseModal}/>
                                <Button className="drop-shadow-sm text-nowrap !bg-[#90B8F8] hover:!bg-[#5F85DB]" type="submit" onClick={handleEditList}>EDIT LIST</Button>

                            </div>
                        </div>
                        <Divider />
                        <div className="flex flex-col justify-center items-center pb-5">
                            <h4 className="text-lg font-semibold mb-4">Options</h4>
                        </div>
                        <div className="w-11/12 md:w-full flex justify-center">
                            <table className="table-auto border rounded-lg">
                                <thead className="bg-[#d9dadb] border rounded-lg">
                                    <tr>
                                        <th className="px-2 py-2 text-left text-sm font-bold text-gray-700">Property Name</th>
                                        <th className="px-2 py-2 text-left text-sm font-bold text-gray-700">Rate</th>
                                        <th className="px-2 py-2 text-left text-sm font-bold text-gray-700">Unit</th>
                                        <th className="px-2 py-2 text-left text-sm font-bold text-gray-700">Layout</th>
                                        <th className="px-2 py-2 text-left text-sm text-nowrap font-bold text-gray-700">Sq Ft</th>
                                        <th className="px-2 py-2 text-left text-sm font-bold text-gray-700">Notes </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.options.map((option, index) => (
                                        <tr
                                            key={option.id}
                                            className={`${index % 2 === 0 ? 'bg-[#232425]' : 'bg-[#26282B]'} text-white hover:bg-gray-100 hover:text-black transition`}
                                        >
                                            <td className="px-2 py-2 whitespace-nowrap text-sm">{option.prop_name}</td>
                                            <td className="px-2 py-2 text-xs">${option.price}</td>
                                            <td className="px-2 py-2 text-xs">{option.unit}</td>
                                            <td className="px-2 py-2 text-xs">{option.layout}</td>
                                            <td className="px-2 py-2 text-xs">{option.sq_ft}</td>
                                            <td className="px-2 py-2 text-xs text-center">
                                                {option.notes ? (
                                                    <Popup
                                                    content={option.notes}
                                                    trigger={<i className="ellipsis horizontal icon"></i>}
                                                    />
                                                ) : ( <></>)}
                                                
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    client: state.listmaker.client,
    isListMode: state.ui.isListMode,
    isReorderMode: state.ui.isReorderMode,
    property: state.listmaker.property
});

export default connect(mapStateToProps, { set_list_mode, set_search_client, load_list, new_option, set_list_edit, update_list_options, reset_list_mode })(ListDetail);