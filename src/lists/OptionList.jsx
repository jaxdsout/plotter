import axios from "axios";
import { useState } from "react";


function OptionList ({ currentList }) {
    const [list, setList] = useState([])

    const all_options = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists/${currentList.id}`, config);
            setList(res.data)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
         <ul class="list-group hover">
                {list.map(option => (
                    <li class="list-group-item" key={option.id}>
                        <div className="d-flex justify-content-between">
                            <p>option.</p>
                        </div>     
                        </li>
                ))}
            </ul>
        </>
    )
}

export default OptionList