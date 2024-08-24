import { Link } from "react-router-dom"

import {ReactComponent as Home} from '../components/home.svg'

function DashNavbar ({ setActiveTab }) {

    return(
        <div className='navbar p-5 bg-body-secondary'>
            <Link onClick={() => setActiveTab('home')}><Home className='icon'/></Link>
            <Link className='poetsen tabs'  onClick={() => setActiveTab('clients')}>clients</Link>
            <Link className='poetsen tabs'  onClick={() => setActiveTab('lists')}>lists</Link>
            <Link className='poetsen tabs' onClick={() => setActiveTab('deals')}>deals</Link>
        </div>
    )

}

export default DashNavbar