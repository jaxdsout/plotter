import { Link } from "react-router-dom"

import {ReactComponent as Home} from '../components/home.svg'

function DashNavbar () {

    return(
        <div className=' d-flex align-items-center'>
        <Link to=""><Home className='icon'/></Link>
        <Link to=""><h2 className='poetsen tabs'>clients</h2></Link>
        <Link><h2 className='poetsen tabs'>lists</h2></Link>
        <Link><h2 className='poetsen tabs'>deals</h2></Link>

        </div>
    )

}

export default DashNavbar