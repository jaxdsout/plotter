import { useState } from "react";
import axios from "axios";
import AllDeals from "./AllDeals";
import NewDeal from "./NewDeal";

function Deals ({ user }) {
    const [deals, setDeals] = useState([])

    const all_deals = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/deals/`, config);
            setDeals(res.data)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="container pt-5 pb-5 bg-dark-subtle">
        <>
            <NewDeal user={user} all_deals={all_deals}/>
        </>
        <div>
            <h6 className="noto-sans"> all deals </h6>
            <AllDeals all_deals={all_deals} deals={deals}/>
        </div>
    </div>
    )
}

export default Deals