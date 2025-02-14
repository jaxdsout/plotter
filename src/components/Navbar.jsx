import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../store/actions/auth';
import { Button } from 'semantic-ui-react';

function Navbar ({ logout, isAuthenticated, isClientView, access }) {
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
                <div>
                    <p className='mont text-[#5F85DB] text-6xl hover:text-[#4d6ebb] active:translate-y-0.5 drop-shadow' onClick={logo_click}>atlas</p>

                </div>
                <div>
                    {access ? 
                        <Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB] drop-shadow active:translate-y-0.5" onClick={logout_user}>LOGOUT</Button> 
                        : 
                        <div className='flex flex-col sm:flex-row items-center justify-center'>
                            <Link className="mb-2 sm:mb-0"to={"/signup/"}><Button className='!bg-[#90B8F8] text-nowrap !text-sm sm:!text-base hover:!bg-[#5F85DB] drop-shadow active:translate-y-0.5'>JOIN NOW</Button></Link>
                            <Link to="/login/"><Button className='text-[#26282B] !text-sm sm:!text-base !bg-white hover:!text-black active:translate-y-0.5'>LOGIN</Button></Link>
                        </div>
                    }
                </div>
            </nav>          
        )}
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isClientView: state.ui.isClientView,
    access: state.auth.access
});

export default connect(mapStateToProps, { logout })(Navbar);

