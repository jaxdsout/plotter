import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';

function Navbar ({ logout, isAuthenticated }) {
    const navigate = useNavigate()

    const logout_user = () => {
        logout();
        navigate("/login/")
    }
    return (
        <div className='navbar text-center header p-5'>
            <Link to={"/"}><h1 className='poetsen'>plotter</h1></Link>
            {isAuthenticated ? 
                <div>
                    <button className='noto-sans button' type="button" onClick={logout_user}>LOGOUT</button>      
                </div>
            : 
                <div>
                    <Link to={"/signup/"}>
                        <button className='noto-sans button' type="button">SIGN UP</button>
                    </Link>
                     <Link to={"/login/"}>
                        <button className='noto-sans button' type="button">LOGIN</button>
                    </Link>
                </div>
            }
              
          
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);

