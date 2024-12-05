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
            await load_lists()
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
                  <div className="flex justify-evenly h-[500px]">
                    <div className="">
                        <div className="flex flex-row">
                            <PropertySearch />
                            <Form onSubmit={() => handlePropertyAdd(list, property)}>
                                <Button color="blue" type="submit">ADD PROPERTY</Button>
                            </Form>
                        </div>
                        <Divider />
                        <OptionList list={list} />
                    </div>
                    <div className="">
                        <MapBox />
                        <Divider />
                        <div className="flex justify-between">
                            <ClearOptions />
                            <Button color="green" type="submit" onClick={handleSaveList}>
                                SAVE LIST
                            </Button>
                        </div>
                    </div>
                </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col justify-evenly h-[500px]">
                        <div className="flex flex-row justify-evenly mb-1">
                            <div>
                                <p><b>Client: </b>{list.client_name}</p>
                                <p><b>Date Created: </b>{formatDate(list.date)}</p>
                                <p><b>Last Updated: </b></p>
                                <p>
                                    <b>URL: </b>
                                    <Input value={link} readOnly className="ml-3 w-[20rem]"/>
                                </p>
                            </div>
                            <div className="flex flex-col justify-between">
                                <DeleteList list={list} handleCloseModal={handleCloseModal}/>
                                <Button type="submit" onClick={handleEditList}>EDIT LIST</Button>

                            </div>
                        </div>
                        <Divider />
                        <div className="flex flex-col justify-center items-center">
                            <h4>Options</h4>
                            <div className="overflow-y-auto pb-10">
                                <ul className='divide-y divide-gray-200 border border-gray-300 rounded-md'>
                                    {list.options.map(option => (
                                        <li className='p-3 font-bold text-white hover:text-black hover:bg-gray-100 transition odd:bg-[#26282B] even:bg-[#232425]' key={option.id}>
                                            <div className="flex flex-row justify-between items-start w-[400px]">
                                                <b className="text-wrap">{option.prop_name}</b>
                                                <p>Rate: ${option.price} | Unit: {option.unit} | Layout: {option.layout} | Sq Ft: {option.sq_ft}<br></br>
                                                    Available: {option.available} | Notes / Specials: {option.notes}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
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