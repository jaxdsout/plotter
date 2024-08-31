import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';
import { Button } from 'semantic-ui-react';

function Navbar ({ logout, isAuthenticated }) {
    const navigate = useNavigate()

    const logout_user = () => {
        logout();
        navigate("/login/")
    }
    return (
        <nav className='navbar p-5 bg-body-tertiary'>
            <div className="container-fluid">
                {isAuthenticated ? 
                    <>
                        <Link to={"/dashboard/"}><h1 className='poetsen'>plotter</h1></Link>
                        <Button onClick={logout_user}>LOGOUT</Button>      
                    </>
                    : 
                    <>
                        <Link to={"/"}><h1 className='poetsen'>plotter</h1></Link>
                        <div>
                            <Link to={"/signup/"}><Button>SIGN UP</Button></Link>
                            <Link to={"/login/"}><Button>LOGIN</Button></Link>
                        </div>
                    </>
                }
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);

