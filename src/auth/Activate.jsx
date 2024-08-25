import { Link, useNavigate, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { useState } from "react"
import { activate } from "../actions/auth";
import { Button } from "semantic-ui-react";

function Activate ({ activate }) {
    const navigate = useNavigate()
    const { uid, token } = useParams();

    const [verify, setVerify] = useState(false)

    const activate_account = e => {
        activate(uid, token)
        setVerify(true)
    }

    if (verify) {
        return navigate('/login/');
    }

    return (
        <div className="container">
            <div className="container">
                <h5> Activate your account: </h5>
                <Button onClick={activate_account} type='button'>ACTIVATE</Button>
            </div>
        </div>
    )
}


export default connect(null, { activate })( Activate );