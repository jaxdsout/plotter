
function Profile ({ profile }) {

    return (
        <div>
            <p>Hey, User! Here's your Profile</p>
            <div>
                <h4>PROFILE</h4>
                <p>Name: { profile.full_name }</p>
                <p>TREC ID: { profile.trec }</p>
                <p>Website: { profile.website }</p>
                <p>Phone: { profile.phone_number }</p>
                <p><a href="/user/profile/edit/">EDIT PROFILE</a></p>
            </div>
        </div>
    )
}

export default Profile 