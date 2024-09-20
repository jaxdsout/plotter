import { Search } from "semantic-ui-react";
import { search_clients, set_search_client, reset_client_results } from "../actions/listmaker";
import { connect } from "react-redux";

function ClientSearch ({ client_results, search_clients, userID, set_search_client, reset_client_results }) {
    
    const handleSearchChange = (e, { value }) => {
        if (value.length > 1) {
            search_clients(value, userID);
        }
    };

    const handleResultSelect =  (e, { result }) => {
        set_search_client(result.id, result.title, result.phone_number, result.email);
    };

    const handleBlur =  () => {
        reset_client_results()
    };




    return (
        <>
       
            <div>
                <Search
                    onSearchChange={handleSearchChange}
                    onResultSelect={handleResultSelect}
                    onBlur={handleBlur}
                    results={client_results.map(result => ({
                        title: `${result.first_name} ${result.last_name}`,
                        id: result.id,
                        phone_number: result.phone_number,
                        email: result.email
                    }))}
                    on
                    id='client_start_list'
                    placeholder="Search for client..."
                    size="large"
                    icon="none"
                    className="me-3"
                    showNoResults={false}
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

export default connect(mapStateToProps, { search_clients, set_search_client, reset_client_results })(ClientSearch);