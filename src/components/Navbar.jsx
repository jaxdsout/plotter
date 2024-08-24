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
        <nav className='navbar p-5 bg-body-tertiary'>
            <div class="container-fluid">
                <Link to={"/"}><h1 className='poetsen'>plotter</h1></Link>
                {isAuthenticated ? 
                    <div>
                        <button type="button" onClick={logout_user}>LOGOUT</button>      
                    </div>
                : 
                    <div>
                        <Link to={"/signup/"}>
                            <button type="button">SIGN UP</button>
                        </Link>
                            <Link to={"/login/"}>
                            <button type="button">LOGIN</button>
                        </Link>
                    </div>
                }
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);

