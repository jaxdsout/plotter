import { useNavigate, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { activate } from "../store/actions/auth";
import { set_activate_success } from "../store/actions/ui";
import { Button, Image, Message } from "semantic-ui-react";
import { useEffect } from "react";

function Activate ({ activate, message, activateSuccess, error, set_activate_success }) {
    const navigate = useNavigate()
    const { uid, token } = useParams();

    const activate_account = async () => {
        activate(uid, token)
    }

    useEffect(() => {
        if (activateSuccess) {
            set_activate_success();
            setTimeout(() => navigate('/login/'), 3000);
        }
    }, [activateSuccess, navigate, set_activate_success])

    return (
        <div className="flex flex-col items-center justify-evenly">
            <div className="w-3/4 max-w-[500px] p-5 mt-5 mb-10 flex flex-col bg-[#26282B] rounded-lg shadow-md shadow-inner">
                <div className="mb-3 flex flex-col items-center">
                    <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1007.jpg"/>
                    <p className="mont text-white text-2xl md:text-4xl mt-4"> activate your account </p>
                </div>
                <div className="flex flex-col items-center justify-evenly">
                    <Button onClick={activate_account} type='button' className="!bg-[#90B8F8] hover:!bg-[#5F85DB]">ACTIVATE</Button>
                </div>
                {message && (
                    <Message positive size="mini">
                        <p>{message}</p>
                    </Message>
                )}
                {error && (
                    <Message negative size="mini">
                        <p>{error}</p>
                    </Message>
                )}
            </div>
        </div>
          
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    message: state.auth.message,
    activateSuccess: state.auth.activateSuccess
});

export default connect(mapStateToProps, { activate, set_activate_success })( Activate );