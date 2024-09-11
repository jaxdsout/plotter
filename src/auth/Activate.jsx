import { useNavigate, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { useState } from "react"
import { activate } from "../actions/auth";
import { Button, Image } from "semantic-ui-react";

function Activate ({ activate }) {
    const navigate = useNavigate()
    const { uid, token } = useParams();
    console.log(uid, "uid", token, "token")

    const [verify, setVerify] = useState(false)

    const activate_account = async () => {
        console.log(uid, "uid", token, "token")
        await activate(uid, token)
        setVerify(true)
    }

    if (verify) {
        return navigate('/login/');
    }

    return (
        <>
            <div className="container-sm sm w-50 pt-5">
                <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1007.jpg"/>
                <div className="mb-4">
                    <h6 className="noto-sans text-center"> Activate your account </h6>
                </div>
                <div className="d-flex justify-content-center">
                    <Button onClick={activate_account} type='button'>ACTIVATE</Button>

                </div>
            </div>
        </>
    )
}


export default connect(null, { activate })( Activate );