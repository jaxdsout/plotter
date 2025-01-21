import { connect } from 'react-redux'

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
            </nav>
        ) : (
            <>
            </>        
        )}
       </>  
    )
}

const mapStateToProps = state => ({
    isClientView: state.ui.isClientView
});

export default connect(mapStateToProps, { })(Footer);