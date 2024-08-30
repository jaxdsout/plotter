import NewList from "./NewList"
import AllLists from "./AllLists";

function Lists () {
    return (
        <div className="container pt-5 pb-5 bg-dark-subtle">
            <NewList />
            <AllLists />
        </div>
    )
}

export default Lists