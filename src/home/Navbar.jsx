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

    const logo_click =  () => {
        if (isClientView) {
            reset_client_view();
            navigate("/")
        } else {
            navigate("/home/")
        }

        if (isAuthenticated) {
            navigate("/dashboard/home/")
        } 

    }

    return (
        <>
        {isClientView ? (
            <nav className='text-center p-5 container_bg'>
                <h1 className='poetsen navlogo' onClick={logo_click}>plotter</h1>
            </nav>
        ) : (
            <nav className='navbar p-5'>
                <h1 className='poetsen navlogo' onClick={logo_click}>plotter</h1>
                {isAuthenticated ? <Button onClick={logout_user}>LOGOUT</Button> : <Link to={"/login/"}><Button>LOGIN</Button></Link>}
            </nav>          
        )}
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isClientView: state.ui.isClientView
});

export default connect(mapStateToProps, { logout, reset_client_view })(Navbar);

