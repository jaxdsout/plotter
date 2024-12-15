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
            navigate("/")
        }

        if (isAuthenticated) {
            navigate("/dashboard/home")
        } 

    }

    return (
        <>
        {isClientView ? (
            <nav className='bg-white text-center p-5'>
                <h1 className='mont text-[#5F85DB] p-5 text-6xl hover:text-[#4d6ebb]' onClick={logo_click}>atlas</h1>
            </nav>
        ) : (
            <nav className='bg-white shadow-inner p-10 flex flex-row justify-between items-center'>
                <h1 className='mont text-[#5F85DB] text-6xl hover:text-[#4d6ebb] drop-shadow' onClick={logo_click}>atlas</h1>
                {isAuthenticated ? 
                    <Button className="drop-shadow-sm -mt-3" onClick={logout_user}>LOGOUT</Button> 
                    : 
                    <Link className='drop-shadow-sm -mt-3' to={"/login/"}><Button>LOGIN</Button></Link>
                }
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

