import { Link, useNavigate, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { useState } from "react"
import { activate } from "../actions/auth";

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
                <button className='noto-sans-upper' onClick={activate_account} type='button'> ACTIVATE </button>
            </div>
        </div>
    )
}


export default connect(null, { activate })( Activate );