import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../store/actions/auth';
import { Button } from 'semantic-ui-react';
import { widget_close, widget_open } from '../store/actions/ui';

function Navbar ({ logout, isAuthenticated, isClientView, access, widget_open, widget_close, widget }) {
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

    const handleWidget = (type) => {
        if (type === 'calculator' || type === 'profile') {
            if (widget === type) {
                widget_close();
            } else {
                widget_close();
                widget_open(type);
            }
        }
    

    }

    return (
        <>
        {!isClientView && (
            <nav className='bg-[#262626] p-8 flex flex-row justify-between items-start rounded-bl-2xl rounded-br-2xl' style={{ zIndex: 5 }}>
                <div>
                    <p className='font-mont text-[#5F85DB] text-5xl sm:text-6xl hover:text-[#4d6ebb] active:translate-y-0.5 drop-shadow' onClick={logo_click}>atlas</p>

                </div>
                <div>
                    {access ? 
                        <div className='flex flex-row items-start justify-start'>
                            <div className='flex flex-col items-center justify-center ml-4 mr-8 sm:mr-8'>
                                <button onClick={() => handleWidget('calculator')}
                                    className='font-mont drop-shadow-md text-3xl active:translate-y-0.5 text-white hover:text-[#5F85DB]'
                                >
                                    <i className="calculator icon !-mr-0 !mb-3 !h-[27px]" />                            
                                </button>
                                <p className='text-[0.65rem] text-white font-mont'>CALCULATOR</p>
                            </div>
                            <div className='flex flex-col items-center justify-center ml-4 mr-8 sm:mr-8'>
                                <button onClick={() => handleWidget('profile')}
                                    className='font-mont drop-shadow-md text-3xl active:translate-y-0.5 text-white hover:text-[#5F85DB]'
                                >
                                    <i className="user circle icon !-mr-0 !mb-3 !h-[27px]" />                            
                                </button>
                                <p className='text-[0.65rem] text-white font-mont'>PROFILE</p>
                            </div>
                       
                            <Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB] drop-shadow active:translate-y-0.5" onClick={logout_user}>LOGOUT</Button> 
                        </div>
                        : 
                        <div className='flex flex-row items-center justify-center'>
                            <Link to={"/signup/"}><Button className='!bg-[#90B8F8] text-nowrap !text-sm sm:!text-base hover:!bg-[#5F85DB] hover:!text-white drop-shadow active:translate-y-0.5'>JOIN NOW</Button></Link>
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
    widget: state.ui.widget,
});

export default connect(mapStateToProps, { logout, widget_close, widget_open })(Navbar);

