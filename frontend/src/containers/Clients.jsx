import NewClient from "../components/NewClient"
import AllClients from "../components/AllClients"

function Clients () {

    return (
        <div className="container-sm sm w-50 pt-5">
            <NewClient />
            <AllClients />
        </div>
    )
}

export default Clients