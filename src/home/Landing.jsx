import { Link } from "react-router-dom";
import { Image, Divider } from "semantic-ui-react";

function Landing() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-evenly body_bg">  
            <div className="container">
                <div className="container mb-3 mt-4">                
                        <Image className="plotter-banner" src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1006.png" />
                        <p className="poetsen fs-1 text-center tagline">the new way to locate</p>
                </div>
                <div className="container-fluid w-75 p-5 d-flex flex-column flex-lg-row container_bg rounded-4">
                    <div className="d-flex flex-column pe-4 ps-4">
                        <p className="text-white">At Plotter, our mission is to streamline the apartment locating process for real estate agents. Instead of juggling multiple platforms or outdated tools, Plotter is designed to be your one-stop shop for finding the perfect home. </p>
                        <p className="text-white">The platform is built on three core pillars: clients, lists, and deals. At the heart of your business is your client. The reason you brew that morning coffee is to help them find the best options that suit their needs and timeline. Plotter understands this, so we’ve centralized everything around your client to make their journey as smooth as possible.</p>
                        <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1008.png" />
                    </div>
                    <div className="d-flex flex-column pe-4 ps-4">
                        <p className="text-white">The second pillar is our powerful list-making feature—the true workhorse of Plotter. While in list mode, you can browse properties across your region, select units, and add any important details, such as specials or notes. When you're ready to send, Plotter packages everything into a unique, shareable link for your client.</p>
                        <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1009.png" />  
                        <p className="text-white">The third pillar is deals. Once you've found your client the perfect place, it’s crucial to track their lease details and stay on top of deadlines. Plotter’s deal-tracking tools notify you about important updates, so nothing slips through the cracks.</p>
                    </div>
                    <div className="d-flex flex-column pe-4 ps-4">
                        <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1010.png" />  
                        <p className="text-white">From your dashboard, you'll also see daily stats like upcoming move-ins and renewal timeframes. We’re currently developing a comprehensive stats feature (exciting, right?) to track everything from most-recommended properties to most-leased, and beyond.</p>
                        <p className="text-white">Plotter is 100% free for licensed real estate agents. Simply sign up, provide your TREC details after activating your account, and a member of our team will confirm everything. Once verified, you're all set to start plotting full-time! </p>
                    </div>
                </div>
            </div>
            <div className="container mt-4 mb-3">        
                <Link to="/signup/"><h1 className="poetsen fs-1 text-center tagline signup">sign up now!</h1></Link>
            </div>
            <Divider />
        </div>
        
    );
}

export default Landing;
