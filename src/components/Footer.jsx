import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react';

function Footer ({ isClientView }) {

    const logo_click =  () => {
        if (isClientView) {
            window.location.href = "/";
        } 
    }

    return (
       <>
       {isClientView ? (
            <nav className='bg-[#26282B] text-center p-5 sticky bottom-0'>
                <h1 className='mont text-[#5F85DB] p-5 text-6xl hover:text-[#4d6ebb] active:translate-y-0.5' onClick={logo_click}>atlas</h1>
                <p className='text-white !text-sm font-sans !mb-5'>
                    <Icon className="copyright"/>
                    <span>2025 Apartment Atlas</span>
                </p>
            </nav>
        ) : (
            <div className='bg-[#f1e9df] text-center p-5 sticky bottom-0'>
                <p className='font-sans text-[#26282B] p-5 !text-sm'>
                    <Icon className="copyright"/>
                    <span>2025 Apartment Atlas</span>
                </p>
            </div>
        )}
       </>  
    )
}

const mapStateToProps = state => ({
    isClientView: state.ui.isClientView
});

export default connect(mapStateToProps, { })(Footer);