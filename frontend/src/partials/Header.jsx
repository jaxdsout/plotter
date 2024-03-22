import { Link } from 'react-router-dom';
import '../styles/partials.css';

function Header () {
    return (
        <div className='header'>
                <Link to={"/"}><h1 className="logo">plotter</h1></Link>
                <div>
                    <Link to={"/home/"}><button className='nav_button'>HOME</button></Link>
                    <Link to={"/sign-out/"}><button className='nav_button'>SIGN OUT</button></Link>
                </div>
        </div>
    )
}

export default Header