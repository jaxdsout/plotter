import { Search } from "semantic-ui-react"
import { connect } from "react-redux";
import { search_properties, reset_prop_results, set_search_prop, reset_prop } from "../store/actions/listmaker";

function PropertySearch({ userID, search_properties, set_search_prop, prop_results, reset_prop_results}) {

    const handleSearchChange = (e, { value }) => {
        if (value.length > 1) {
            search_properties(value, userID);
        }
    };

    const handleResultSelect = (e, { result }) => {
        const selectedProperty = prop_results.find(property => property.id === result.id);
        set_search_prop(selectedProperty);
    };

    const handleBlur =  () => {
        reset_prop_results()
        reset_prop()
    }

    return(
        <>
            <Search
                onSearchChange={handleSearchChange}
                onResultSelect={handleResultSelect}
                onBlur={handleBlur}
                defaultOpen={null}
                results={prop_results.map(property => ({
                    title: `${property.name}`,
                    subtitle: `${property.address}`,
                    id: property.id,
                }))}
                icon="none"
                size="large"
                className=""
                placeholder="Search for property..."
                />
        </>
    )
}

const mapStateToProps = state => ({
    userID: state.auth.user.id,
    error: state.auth.error,
    prop_results: state.listmaker.prop_results,
    list: state.listmaker.list,
    client: state.listmaker.client,
    isListMode: state.ui.isListMode,
});

export default connect(mapStateToProps, { set_search_prop, search_properties, reset_prop_results, reset_prop })(PropertySearch);