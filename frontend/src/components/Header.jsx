import { Link } from 'react-router-dom';

function Header () {
    return (
        <div className='navbar text-center'>
                    <Link to={"/"}><h1>plotter</h1></Link>
                    <div className=''> 
                        <Link to={"/signup/"}>
                            <button className='btn btn-outline-light btn-lg'>SIGN UP</button>
                        </Link>
                        <Link to={"/login/"}>
                            <button className='btn btn-dark btn-lg'>LOGIN</button>
                        </Link>
                    </div>
        </div>
    )
}

export default Header