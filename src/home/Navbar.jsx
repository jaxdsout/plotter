import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';
import { Button } from 'semantic-ui-react';
import { reset_client_view } from '../actions/ui';

function Navbar ({ logout, isAuthenticated, isClientView, reset_client_view }) {
    const navigate = useNavigate()

    const logout_user = () => {
        logout();
        navigate("/login/")
    }

    const redirect_client = async () => {
        await reset_client_view();
        navigate("/home/")
    }

    return (
        <nav className='navbar p-5'>
            {isClientView ?
                <Link onClick={redirect_client}><h1 className='poetsen navlogo'>plotter</h1></Link>                    
            :
                <>
                    {isAuthenticated ? 
                        <>
                            <Link to={"/dashboard/home"}><h1 className='poetsen navlogo'>plotter</h1></Link>
                            <Button onClick={logout_user}>LOGOUT</Button>      
                        </>
                    : 
                        <>
                            <div>
                                <Link to={"/"}><h1 className='poetsen navlogo'>plotter</h1></Link>
                            </div>
                            <div>
                                <Link to={"/signup/"}><Button className='button_bg'>SIGN UP</Button></Link>
                                <Link to={"/login/"}><Button>LOGIN</Button></Link>
                            </div>
                        </>
                    }
                </>
            }
        </nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isClientView: state.ui.isClientView
});

export default connect(mapStateToProps, { logout, reset_client_view })(Navbar);

