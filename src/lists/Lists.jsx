import NewList from "./NewList"
import AllLists from "./AllLists";
import { useState } from "react";
import axios from "axios";

function Lists ({ userID }) {
    const [lists, setLists] = useState([])

    const all_lists = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lists/`, config);
            setLists(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container pt-5 pb-5 bg-dark-subtle">
            <NewList userID={userID} all_lists={all_lists}/>
            <h6 className="noto-sans-upper"> all lists </h6>
            <AllLists all_lists={all_lists} lists={lists}/>
        </div>
    )
}

export default Lists