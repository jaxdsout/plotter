import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../store/actions/auth';
import { Button } from 'semantic-ui-react';
import { profile_widget_close, profile_widget_open } from '../store/actions/ui';

function Navbar ({ logout, isAuthenticated, isClientView, access, profile_widget_close, profile_widget_open, profileWidget }) {
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

    const handleProfileWidget = () => {
        if (profileWidget) {
            profile_widget_close();
        }
        
        if (!profileWidget) {
            profile_widget_open();
        };
    }

    return (
        <>
        {isClientView ? (
            <>
            </>
        ) : (
            <nav className='bg-white pl-8 pr-8 pt-8 pb-6 flex flex-row justify-between items-start rounded-bl-2xl rounded-br-2xl'>
                <div>
                    <p className='mont text-[#5F85DB] text-5xl sm:text-6xl hover:text-[#4d6ebb] active:translate-y-0.5 drop-shadow' onClick={logo_click}>atlas</p>

                </div>
                <div>
                    {access ? 
                        <div className='flex flex-row items-start justify-start'>
                            <div className='flex flex-col items-center justify-center ml-4 mr-8 sm:mr-8'>
                                <button onClick={() => handleProfileWidget()}
                                    className='mmont drop-shadow-md text-3xl active:translate-y-0.5 text-[#26282B] hover:text-[#5F85DB]'
                                >
                                    <i className="user circle icon !-mr-0 !mb-3 !h-[27px]" />                            
                                </button>
                                <p className='text-[0.65rem] text-[#26282B] mont'>PROFILE</p>
                            </div>
                            <Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB] drop-shadow active:translate-y-0.5" onClick={logout_user}>LOGOUT</Button> 
                        </div>
                        : 
                        <div className='flex flex-col sm:flex-row items-center justify-center'>
                            <Link className="mb-2 sm:mb-0"to={"/signup/"}><Button className='!bg-[#90B8F8] text-nowrap !text-sm sm:!text-base hover:!bg-[#5F85DB] hover:!text-white drop-shadow active:translate-y-0.5'>JOIN NOW</Button></Link>
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
    access: state.auth.access,
    profileWidget: state.ui.profileWidget
});

export default connect(mapStateToProps, { logout, profile_widget_close, profile_widget_open })(Navbar);

