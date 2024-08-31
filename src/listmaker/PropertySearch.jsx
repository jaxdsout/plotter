import { Search, Form, Button } from "semantic-ui-react"
import { useState } from "react";
import { connect } from "react-redux";
import { new_option, search_properties } from "../actions/listmaker";

function PropertySearch({ userID, listID, search_properties, new_option, search_results, clientID }) {

    const [formData, setFormData] = useState({
        property: '',
        list: listID,
        client: clientID
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
        console.log(property, list, client)
        new_option(property, list, client);
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
    listID: state.listmaker.list.id,
});

export default connect(mapStateToProps, { search_properties, new_option })(PropertySearch);