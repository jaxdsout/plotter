import { Form, FormField, Button } from "semantic-ui-react";
import { useState } from "react";
import axios from "axios";

function UpdateOption ({ optionID, listID }) {
    const [optionForm, setOptionForm] = useState({
        price: '',
        unit_number: '',
        layout: '',
        sq_ft: '',
        available: '',
        notes: '',
        list: listID 
    });
    const { price, unit_number, layout, sq_ft, available, notes, list } = optionForm;


    const updateOption = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            const body = JSON.stringify({ price, unit_number, layout, sq_ft, available, notes, list });
            console.log("update option body", body)
            try {
                console.log("list ID", listID)
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/options/${optionID}/`, body, config);
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleChange = (e) => setOptionForm({ ...optionForm, [e.target.name]: e.target.value });


    const handleSubmit = (e) => {
        e.preventDefault();
        updateOption();
    };

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <FormField>
                    <label className="noto-sans" htmlFor='price'>Price:</label>
                    <input
                        type='number'
                        name='price'
                        value={price}
                        onChange={handleChange}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans" htmlFor='unit_number'>Unit Number:</label>
                    <input
                        type='text'
                        name='unit_number'
                        value={unit_number}
                        onChange={handleChange}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans" htmlFor='email'>Layout:</label>
                    <input
                        type='text'
                        name='layout'
                        value={layout}
                        onChange={handleChange}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans" htmlFor='sq_ft'>Sq Ft:</label>
                    <input
                        type='number'
                        name='sq_ft'
                        value={sq_ft}
                        onChange={handleChange}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans" htmlFor='available'>Available:</label>
                    <input
                        type='date'
                        name='available'
                        value={available}
                        onChange={handleChange}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans" htmlFor='notes'>Notes/Specials:</label>
                    <input
                        type='text'
                        name='notes'
                        value={notes}
                        onChange={handleChange}
                        required
                    />
                </FormField>
                <Button type="submit" color="green">UPDATE OPTION</Button>
            </Form>
        </>
    )
}

export default UpdateOption;