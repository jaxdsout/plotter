import { Card, CardContent, CardHeader, CardDescription, CardMeta, Image } from 'semantic-ui-react';

function ProfileWidget ({ profile }) {

    return (
        <>
            <Card>
                <Image src={profile.avatar} wrapped ui={false} />
                <CardContent>
                    <CardHeader>{profile.full_name}</CardHeader>
                    <CardMeta>
                        <span className='date'>TREC ID: {profile.trec}</span>
                    </CardMeta>
                    <CardDescription>
                    </CardDescription>
                </CardContent>
                <CardContent extra>
                    <p>Phone: {profile.phone_number}</p>
                    <p>Email: {profile.email}</p>
                    <p>Website: {profile.website}</p>
                </CardContent>
            </Card>
        </>
    )
}

export default ProfileWidget