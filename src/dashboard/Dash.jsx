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
                    <div className='container-sm h-25'>
                        <img className="img-thumbnail rounded-circle w-25" src={profile.avatar} alt='avatar'/>
                        <p>{profile.full_name}</p>
                        <p>TREC ID: {profile.trec}</p>
                        <p>Phone: {profile.phone_number}</p>
                        <p>Email: {profile.email}</p>
                        <p>Website: {profile.website}</p>
                    </div>
                    <div>
                        <h4>Ideas for Dash</h4>
                        <ul className='list-group'>
                            <li className='list-group-item'>Donut Chart: for Paid, Unpaid, Overdue, Cancelled</li>
                            <li className='list-group-item'>Bar Graph: Monthly earnings over Year</li>
                            <li className='list-group-item'>List: Past Client Renewals Coming Up</li>
                            <li className='list-group-item'>List: Client Move-Ins Approaching</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Guest Cards</h4>
                        <p>eventual modal for sending guest cards</p>
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    )
}



export default Dash;