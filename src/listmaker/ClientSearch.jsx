import { Search } from "semantic-ui-react";
import { search_clients, set_search_client } from "../actions/listmaker";
import { set_list_mode } from "../actions/ui"
import { connect } from "react-redux";

function ClientSearch ({ client_results, search_clients, userID, set_search_client, set_list_mode }) {
    
    const handleSearchChange = (e, { value }) => {
        if (value.length > 1) {
            search_clients(value, userID);
        }
    };

    const handleResultSelect =  (e, { result }) => {
        set_search_client(result.id, result.title)
        console.log(result.id, result.title)
    };

    return (
        <>
            <div>
                <label htmlFor='client_start_list'>Search Client Name: </label>
                <Search
                    onSearchChange={handleSearchChange}
                    onResultSelect={handleResultSelect}
                    results={client_results.map(result => ({
                        title: `${result.first_name} ${result.last_name}`,
                        id: result.id
                    }))}
                    id='client_start_list'
                />
            </div>
                        
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userID: state.auth.user.id,
    error: state.auth.error,
    client_results: state.listmaker.client_results,
});

export default connect(mapStateToProps, { search_clients, set_search_client, set_list_mode })(ClientSearch);