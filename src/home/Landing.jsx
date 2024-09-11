import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";

function Landing() {
    return (
        <>
            <div className="container">        
                <Image className="plotter-banner" src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1006.jpg" />
                <h1 className="poetsen tagline">the only way to locate</h1>
            </div>
            <div className="container-fluid w-75 pt-5 pb-5">
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column flex-nowrap p-3">
                        <div>
                            <p>
                                Our goal at plotter is to make apartment locating a more streamlined process for the real estate agent. Rather than utilize multiple software technologies or outmoded designs, plotter aims to become your one-stop shop for locating.
                            </p>
                            <p>
                                The platform is built on three pillars: clients, lists, and deals. At the heart of your business is your client. Your whole reason for making that coffee each morning is to find your client the best options which fit their needs and timeline. Plotter understands this so we have centralized everything under the client first and foremost.
                            </p>
                            <p>
                                The second pillar is the listmaking feature of plotter. The real meat & potatoes as they say. While in list mode, you will be able to index across all of the properties in your respective area. Once selected, you can specify details for their unit and any specials or notes. Whenever you're ready to hit send, plotter will package everything up neatly into a unique link that you can share with your client.
                            </p>
                        </div>
                        <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1004.jpg" />
                    </div>
                    <div className="d-flex flex-column flex-nowrap p-3">
                        <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1002.jpg" />
                        <div>
                            <p>
                                The third pillar of the platform is deals. Once you find someone the perfect place to call home, it makes a lot of sense to track the details of their lease. Along with notifying you when something is overdue. Plotter has you handled on all fronts when it comes to deals utilizing a daily dashboard.
                            </p>
                            <p>
                                The dashboard is also where you will find daily stats like upcoming client move-ins or past client renewal timeframes. We are also developing a full stats pillar (yay!) so you can track everything from most recommended properties to most leased at to dare we say, the moon.
                            </p>
                            <p>
                                Plotter is currently 100% free for any licensed real estate agent to use. Simply sign up and provide your TREC details after activating your account! A member of our team will then confirm everything is okay. Once confirmed, you'll be free to start plotting full-time! 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">        
                <Link to="/signup/"><h1 className="poetsen tagline signup">sign up now!</h1></Link>
            </div>
        </>
    );
}

export default Landing;
