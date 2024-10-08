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

    const client_click =  () => {
        reset_client_view();
    }
    

    return (
        <nav className='navbar p-5'>
            {isAuthenticated ?
                <>
                    <Link to={"/dashboard/home"}><h1 className='poetsen navlogo'>plotter</h1></Link>      
                    <Button onClick={logout_user}>LOGOUT</Button>                    
                </>
            :
                <>
                    {isClientView ?
                        <>
                            <Link to={"/home/"} onClick={client_click}><h1 className='poetsen navlogo'>plotter</h1></Link>      
                        </>
                    :
                        <>
                            <Link to={"/home/"}><h1 className='poetsen navlogo'>plotter</h1></Link>      
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

