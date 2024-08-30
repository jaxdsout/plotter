import { Search, Form, Button } from "semantic-ui-react"
import { useState } from "react";
import { connect } from "react-redux";
import { load_options, new_option, search_properties } from "../actions/listmaker";

function PropertySearch({ userID, listID, search_properties, new_option, load_options, search_results, currentClient }) {

    const [formData, setFormData] = useState({
        property: '',
        list: listID,
        client: currentClient.id
    });
    const { property, list, client } = formData;

    const handleSearchChange = (e, { value }) => {
        if (value.length > 1) {
            search_properties(value, userID);
        }
    };

    const handleResultSelect = (e, { result }) => {
        setFormData({ ...formData, property: result.id });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        new_option(property, list, client);
        load_options(listID);
    };


    return(
        <>
            <div className="d-flex flex-row justify-content-around">
                <Search
                    onSearchChange={handleSearchChange}
                    onResultSelect={handleResultSelect}
                        results={search_results.map(property => ({
                            title: `${property.name} ${property.address}`,
                            id: property.id
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
    listID: state.listmaker.list.id,
});

export default connect(mapStateToProps, { search_properties, new_option, load_options })(PropertySearch);