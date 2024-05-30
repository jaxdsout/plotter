import { Link } from 'react-router-dom';

function Header () {
    return (
        <div className='navbar text-center header p-5'>
            <Link to={"/"}><h1 className='poetsen'>plotter</h1></Link>
            <Link to={"/login/"}>
                <button className='noto-sans button' type="button">LOGIN</button>
            </Link>
        </div>
    )
}

export default Header