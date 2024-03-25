import { Link } from 'react-router-dom';
import '../styles/partials.css';

function Header () {
    return (
        <div className='header'>
                <Link to={"/"}><h1 className="logo">plotter</h1></Link>
                <div>
                    <Link to={"/signup/"}><button className='nav_button'>SIGN UP</button></Link>
                    <Link to={"/login/"}><button className='nav_button'>LOGIN</button></Link>
                </div>
        </div>
    )
}

export default Header