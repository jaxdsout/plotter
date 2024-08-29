import { Search, Form, Button, Divider } from "semantic-ui-react"
import { useState } from "react";
import MapBox from "./MapBox"
import axios from "axios";
import OptionList from "../lists/OptionList";

function PropertySearch({ currentList, currentClient }) {
    const [searchResults, setSearchResults] = useState([]);

    const [formData, setFormData] = useState({
        property: '',
        list: currentList.id,
        client: currentClient.id
    });
    const { property, list, client } = formData;

    const createOption = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            const body = JSON.stringify({ property, list, client });
            console.log(body, "body")
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/options/`, body, config);
            } catch (err) {
                console.error(err);
            }
        }
    };

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
        createOption();
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
            <div>
                <OptionList currentList={currentList} />
            </div>
         
        </>
    )
}

export default PropertySearch