import { useEffect, useState } from 'react';
import axios from 'axios';


function Dash ({ userID }) {
    const [profile, setProfile] = useState(null);

    const getProfile = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profiles/`, config);
                const userProfile = res.data.find(profile => profile.user === userID);
                if (userProfile) {
                    setProfile(userProfile);
                } else {
                    console.error("Profile not found");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        if (userID) {
            getProfile();
        }
    }, [userID]);

    return (
        <div className='container bg-dark-subtle'>
            {profile ? (
                <div>
                    <img className="img-thumbnail rounded-circle w-25" src={profile.avatar} alt='avatar'/>
                    <p>{profile.full_name}</p>
                    <p>TREC ID: {profile.trec}</p>
                    <p>Phone: {profile.phone_number}</p>
                    <p>Email: {profile.email}</p>
                    <p>Website: {profile.website}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    )
}



export default Dash;