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
        setTimeout(() => { navigate('/login/') }, 500)
    }

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
            </div>
        </div>
          
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    message: state.auth.message
});

export default connect(mapStateToProps, { activate })( Activate );