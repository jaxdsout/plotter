import { Search } from "semantic-ui-react"
import { connect } from "react-redux";
import { load_options, search_properties, reset_prop_results, set_search_prop } from "../actions/listmaker";

function PropertySearch({ userID, search_properties, set_search_prop, prop_results, reset_prop_results}) {

    const handleSearchChange = (e, { value }) => {
        if (value.length > 1) {
            search_properties(value, userID);
        }
    };

    const handleResultSelect = (e, { result }) => {
        console.log(result)
        set_search_prop(result.id, result.title);
    };

    const handleBlur =  () => {
        reset_prop_results()
    }



    return(
        <div className="d-flex flex-row justify-content-evenly align-items-center">
            <Search
                onSearchChange={handleSearchChange}
                onResultSelect={handleResultSelect}
                onBlur={handleBlur}
                results={prop_results.map(property => ({
                    title: `${property.name}`,
                    subtitle: `${property.address}`,
                    id: property.id,
                }))}
                icon="none"
                size="large"
                className="me-3"
                placeholder="Search for property..."
                />
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userID: state.auth.user.id,
    error: state.auth.error,
    prop_results: state.listmaker.prop_results,
    list: state.listmaker.list,
    client: state.listmaker.client,
    isListMode: state.ui.isListMode
});

export default connect(mapStateToProps, { set_search_prop, search_properties, load_options, reset_prop_results })(PropertySearch);