import { Search, Form, Button, Divider } from "semantic-ui-react"
import { useState } from "react";
import MapBox from "../components/MapBox"
import axios from "axios";
import OptionList from "./OptionList";

function PropertySearch({ listID, currentClient, createOption, all_options }) {
    const [searchResults, setSearchResults] = useState([]);

    const [formData, setFormData] = useState({
        property: '',
        list: listID,
        client: currentClient.id
    });
    const { property, list, client } = formData;
    

    const searchProperties = async (query) => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/properties/?search=${query}`, config);
                setSearchResults(res.data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSearchChange = (e, { value }) => {
        if (value.length > 1) {
            searchProperties(value);
        }
    };

    const handleResultSelect = (e, { result }) => {
        setFormData({ ...formData, property: result.id });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createOption(property, list, client);
        all_options();
    };


    return(
        <>
            <div className="d-flex justify-content-between">
                <Search
                    onSearchChange={handleSearchChange}
                    onResultSelect={handleResultSelect}
                        results={searchResults.map(property => ({
                            title: `${property.name} ${property.address}`,
                            id: property.id
                    }))}
                />
                <Form onSubmit={handleSubmit}>
                    <Button type="submit">ADD PROPERTY</Button>
                </Form>
            </div>
            <Divider />
        </>
    )
}

export default PropertySearch