import NewClient from "./NewClient"
import AllClients from "./AllClients"

function Clients () {

    return (
        <div className="container pt-5 pb-5 bg-dark-subtle">
            <NewClient />
            <AllClients />
        </div>
    )
}

export default Clients