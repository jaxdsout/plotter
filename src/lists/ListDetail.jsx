import { Button, Input, Divider, Form } from "semantic-ui-react";
import { reset_list_mode, set_list_mode } from "../actions/ui";
import { connect } from "react-redux";
import { set_search_client, update_list, reset_prop, reset_prop_results, load_options, new_option, set_list_edit} from "../actions/listmaker";
import { load_lists } from "../actions/agent";
import PropertySearch from "../listmaker/PropertySearch";
import OptionList from "../listmaker/OptionList";
import MapBox from "../listmaker/MapBox";
import ClearOptions from "../listmaker/ClearOptions";
import DeleteList from "./DeleteList";
import ReorderList from "../listmaker/ReorderList";

function ListDetail({ list, property, set_list_mode, user, new_option, 
    reset_prop, reset_prop_results, set_search_client, set_list_edit, load_options, handleCloseModal, load_lists, 
    isListMode, client, options, update_list, reset_list_mode }) {

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
            await set_list_edit(list)
            set_list_mode()
        }
    }


    const handleSaveList = async () => {
        if (list && isListMode && client && options) {
            await update_list(user.id, client.id, list, options)
            await reset_list_mode()
            await load_options(list.id)
        }
    }

    const handlePropertyAdd = async (list, property) => {
        if (property && list) {
            await new_option(property.id, list.id, client.id);
            await reset_prop_results()
            await reset_prop()
            load_options(list.id)
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
                        <OptionList list={list} />
                    </div>
                    <div>
                        <div className="flex items-center justify-center pt-7 pb-3">
                            <MapBox />
                        </div>
                        <Divider />
                        <div className="flex justify-between items-start">
                            <ClearOptions />
                            <ReorderList />
                            <Button className="drop-shadow-sm" color="green" type="submit" onClick={handleSaveList}>
                                SAVE LIST
                            </Button>
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
                                    <b>URL: </b>
                                    <Input value={link} readOnly className="ml-3 w-[10rem]"/>
                                </p>
                            </div>
                            <div className="flex flex-col justify-evenly items-center">
                                <DeleteList list={list} handleCloseModal={handleCloseModal}/>
                                <Button className="drop-shadow-sm text-nowrap !bg-[#90B8F8] hover:!bg-[#5F85DB]" type="submit" onClick={handleEditList}>EDIT LIST</Button>

                            </div>
                        </div>
                        <Divider />
                        <div className="flex flex-col justify-center items-center">
                            <h4 className="text-lg font-semibold mb-4">Options</h4>
                            <div className="overflow-x-auto pb-10 w-11/12">
                                <table className="table-auto border border-gray-300 rounded-lg">
                                    <thead className="bg-gray-300 border border-none rounded-lg">
                                        <tr>
                                            <th className="px-3 py-2 text-left font-bold text-gray-700">Property Name</th>
                                            <th className="px-3 py-2 text-left font-bold text-gray-700">Rate</th>
                                            <th className="px-3 py-2 text-left font-bold text-gray-700">Unit</th>
                                            <th className="px-3 py-2 text-left font-bold text-gray-700">Layout</th>
                                            <th className="px-3 py-2 text-left text-nowrap font-bold text-gray-700">Sq Ft</th>
                                            <th className="px-3 py-2 text-left font-bold text-gray-700">Notes </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.options.map((option, index) => (
                                            <tr
                                                key={option.id}
                                                className={`${index % 2 === 0 ? 'bg-[#232425]' : 'bg-[#26282B]'} text-white hover:bg-gray-100 hover:text-black transition`}
                                            >
                                                <td className="px-3 py-2 whitespace-nowrap text-sm">{option.prop_name}</td>
                                                <td className="px-3 py-2 text-sm">${option.price}</td>
                                                <td className="px-3 py-2 text-sm">{option.unit}</td>
                                                <td className="px-3 py-2 text-sm">{option.layout}</td>
                                                <td className="px-3 py-2 text-sm">{option.sq_ft}</td>
                                                <td className="px-3 py-2 text-sm">{option.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.auth.error,
    client: state.listmaker.client,
    isListMode: state.ui.isListMode,
    options: state.listmaker.options,
    property: state.listmaker.property
});

export default connect(mapStateToProps, { set_list_mode, set_search_client, load_lists, new_option, set_list_edit, update_list, load_options, reset_list_mode, reset_prop, reset_prop_results })(ListDetail);