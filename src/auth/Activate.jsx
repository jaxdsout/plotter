import { useNavigate, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { useState } from "react"
import { activate } from "../actions/auth";
import { Button, Image, Message } from "semantic-ui-react";

function Activate ({ activate, message }) {
    const navigate = useNavigate()
    const { uid, token } = useParams();
    console.log(uid, "uid", token, "token")

    const [verify, setVerify] = useState(false);

    const activate_account = async () => {
        await activate(uid, token)
        setVerify(true)
    }

    if (verify) {
        setTimeout(() => { navigate('/login/') }, 5000)
    }

    return (
        <>
            <div className="container-sm sm w-50 pt-5">
                <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1007.jpg"/>
                <p className="poetsen fs-1 text-center tagline"> activate your account </p>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Button onClick={activate_account} type='button'>ACTIVATE</Button>
                {message && (
                <Message positive size="mini">
                    <Message.Header>Activation Successful</Message.Header>
                    <p>{message}</p>
                </Message>
                )}
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    message: state.auth.message
});

export default connect(mapStateToProps, { activate })( Activate );