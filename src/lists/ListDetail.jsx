import { Button, Input, Divider, Form } from "semantic-ui-react";
import { reset_list_mode, set_list_mode } from "../actions/ui";
import { connect } from "react-redux";
import { set_search_client, set_list_edit, delete_list, update_list, reset_prop, reset_prop_results, load_options, new_option} from "../actions/listmaker";
import { load_lists } from "../actions/agent";
import PropertySearch from "../listmaker/PropertySearch";
import OptionList from "../listmaker/OptionList";
import MapBox from "../listmaker/MapBox";
import ClearOptions from "../listmaker/ClearOptions";

function ListDetail({ list, property, set_list_mode, user, new_option, reset_prop, reset_prop_results, set_search_client, set_list_edit, load_options, handleCloseModal, load_lists, delete_list, isListMode, client, options, update_list, reset_list_mode }) {

    console.log(list)
    const link = `localhost:3000/list/${list.uuid}`

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
            await set_list_mode()
        }
    }

    const handleDeleteList = async () => {
        if (user && list) {
            const listID = list.id;
            await delete_list(listID)
            await load_lists()
            handleCloseModal()
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
            console.log(property, list.id, client.id)
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
                  <div className="d-flex justify-content-evenly" style={{ height: "500px"}}>
                    <div className="">
                        <div className="d-flex flex-row">
                            <PropertySearch />
                            <Form onSubmit={() => handlePropertyAdd(list, property)}>
                                <Button color="blue" type="submit">ADD PROPERTY</Button>
                            </Form>
                        </div>
                        <Divider />
                        <OptionList />
                    </div>
                    <div className="">
                        <MapBox />
                        <Divider />
                        <div className="d-flex justify-content-between">
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
                <div className="d-flex justify-content-between">
                <div>
                    <p><b>Client: </b>{list.client_name}</p>
                    <p><b>Date Created: </b>{formatDate(list.date)}</p>
                    <p><b>Last Updated: </b></p>
                    <p><b>URL: </b><Input value={link} readOnly /></p>
                </div>
                <div>
                    <Button color="red" type="submit" onClick={handleDeleteList}>DELETE LIST</Button>
                </div>
            </div>
            <div className="mt-5">
                <div className="d-flex justify-content-between">
                    <h4>Option List</h4>
                    <Button type="submit" onClick={handleEditList}>EDIT LIST</Button>
                </div>
                <div>
                    <ul>
                        {list.options.map(option => (
                            <li key={option.id}>
                                <div>
                                    <b>{option.prop_name}</b>
                                    <p>Rate: ${option.price} | Unit: {option.unit} | Layout: {option.layout} | Sq Ft: {option.sq_ft} | Available: {option.available} | Notes / Specials: {option.notes}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
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

export default connect(mapStateToProps, { set_list_mode, set_search_client, set_list_edit, load_lists, delete_list, new_option, update_list, load_options, reset_list_mode, reset_prop, reset_prop_results })(ListDetail);