import AllCards from "./AllCards";
import NewCard from "./NewCard";
import { connect } from "react-redux";

function Cards () {    
    return (
        <>            
            <NewCard />
            <AllCards />
        </>
    )
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { })(Cards);