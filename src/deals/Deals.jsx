import AllDeals from "./AllDeals";
import NewDeal from "./NewDeal";

function Deals ({ user }) {
    return (
        <div className="container pt-5 pb-5 bg-dark-subtle">
            <NewDeal />
            <AllDeals />
    </div>
    )
}

export default Deals