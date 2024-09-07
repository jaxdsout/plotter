import { Search, Form, Button } from "semantic-ui-react"
import { useState } from "react";
import { connect } from "react-redux";
import { load_options, new_option, search_properties } from "../actions/listmaker";

function PropertySearch({ userID, list, search_properties, new_option, search_results, client, load_options }) {

    const [formData, setFormData] = useState({
        property: '',
    });
    const { property } = formData;

    const handleSearchChange = (e, { value }) => {
        if (value.length > 1) {
            search_properties(value, userID);
        }
    };

    const handleResultSelect = (e, { result }) => {
        setFormData({ ...formData, property: result.id });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (property) {
            console.log(property, list.id, client.id)
            await new_option(property, list.id, client.id);
            setFormData({property: ''})
            load_options(list.id)
        }
    };


    return(
        <>
            <div className="d-flex flex-row justify-content-around">
                <Search
                    onSearchChange={handleSearchChange}
                    onResultSelect={handleResultSelect}
                        results={search_results.map(property => ({
                            title: `${property.name}`,
                            subtitle: `${property.address}`,
                            id: property.id,
                    }))}
                />
                <Form onSubmit={handleSubmit}>
                    <Button type="submit">ADD PROPERTY</Button>
                </Form>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userID: state.auth.user.id,
    error: state.auth.error,
    search_results: state.listmaker.prop_results,
    list: state.listmaker.list,
    client: state.listmaker.client
});

export default connect(mapStateToProps, { search_properties, new_option, load_options })(PropertySearch);