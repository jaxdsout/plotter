import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { auth_user, load_user } from '../actions/auth';
import DashNavbar from '../components/DashNavbar';

function Dashboard (props) {

    useEffect(() => {
        props.auth_user();
        props.load_user();
    }, [])



    return (
        <div className="container">
            <DashNavbar />
            {props.children}
        </div>
    )
}

export default connect(null, { auth_user, load_user })(Dashboard);