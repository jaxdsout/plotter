import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';
import { Button } from 'semantic-ui-react';

function Navbar ({ logout, isAuthenticated, isClientView }) {
    const navigate = useNavigate()

    const logout_user = () => {
        logout();
        navigate("/login/")
    }

    const logo_click =  () => {
        if (isAuthenticated) {
            navigate("/dashboard/home")
        } else {
            navigate("/")
        }
    }

    return (
        <>
        {isClientView ? (
            <>
            </>
        ) : (
            <nav className='bg-white shadow-inner pl-8 pr-8 pt-8 pb-6 flex flex-row justify-between items-center'>
                <h1 className='mont text-[#5F85DB] text-6xl hover:text-[#4d6ebb] drop-shadow' onClick={logo_click}>atlas</h1>
                {isAuthenticated ? 
                    <Button className="drop-shadow-sm" onClick={logout_user}>LOGOUT</Button> 
                    : 
                    <Link className='drop-shadow-sm' to={"/login/"}><Button>LOGIN</Button></Link>
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

export default connect(mapStateToProps, { logout })(Navbar);

