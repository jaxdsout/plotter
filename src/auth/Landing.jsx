import { Link, useNavigate } from "react-router-dom";
import { Image, Button } from "semantic-ui-react";
import { useEffect } from "react";
import { reset_client_view } from "../store/actions/ui";
import { connect } from "react-redux";

function Landing({ access, refresh }) {
    const navigate = useNavigate();

    useEffect(() => {
        reset_client_view()

        if (access && refresh) {
            navigate('/dashboard/home')
        }
        
    }, [access, refresh, navigate])

    return (
        <div className="flex flex-col items-center justify-evenly animator">  
            <div className="w-11/12 max-w-[600px] p-7 mt-5 mb-10 flex flex-col bg-[#e4e0d9] flex flex-col items-center justify-center rounded-md">
                <Image className="drop-shadow-md" src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1006.png" />
                <p className="mont drop-shadow text-[#5F85DB] text-3xl md:text-5xl text-center text-nowrap mb-4 mt-2">a new way to locate</p>
                <div className="flex flex-col bg-[#26282B] shadow-inner shadow-md rounded-lg p-6">
                    <p className="text-white">At Atlas, our mission is to streamline the entire apartment locating process for real estate agents. Instead of juggling multiple platforms and outdated tools, Atlas is designed to be the one-stop shop for sending your clients the perfect options. </p>
                </div>
                <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1010.png" className="drop-shadow-md"/>  
                <div className="flex flex-col bg-[#26282B] shadow-inner shadow-md rounded-lg p-6 text-white">
                    <p>The platform is built on three core pillars: <b>clients</b>, <b>lists</b>, and <b>deals.</b> </p>
                    <p>At the heart of your business is your client. The reason you brew that morning coffee is to help them find the best units which suit their needs and timeline. We understand this fact, so we’ve centralized everything in Atlas around your clients in order to make their journeys as smooth as possible.</p>
                    <p>The second pillar is our powerful list-making feature. The true workhorse of Atlas. While crafting lists, you can browse properties across your region, select units, and add any important details such as specials or notes. When you're ready to send, Atlas packages everything into a unique, shareable link for your client.</p>
                    <p>The third pillar is the deal tracker. Once you've found your client the perfect place, it’s crucial to record their lease details and stay on top of payment deadlines. Atlas' deal-tracking tools notify you about important updates, so nothing slips through the cracks.</p>
                </div>
                <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1009.png" className="drop-shadow"/>  
                <div className="flex flex-col bg-[#26282B] shadow-inner shadow-md rounded-lg p-6 text-white">
                    <p>From your dashboard, you'll see daily stats like upcoming move-ins and renewal timeframes and monthly reports like income summaries and overdues. We’re currently developing a comprehensive stats feature (exciting, right?) to track everything from most-recommended properties to most-leased, and beyond.</p>
                </div>
                <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1008.png" className="drop-shadow-md"/>
                <div className="flex flex-col bg-[#26282B] shadow-inner shadow-md rounded-lg p-6 text-white">
                    <p>Atlas is 100% free for licensed real estate agents right now. Simply sign up, provide your TREC details after activating your account, and a member of our team will confirm everything afterward. </p>
                </div>
                <div className="w-full flex flex-col items-center bg-[#26282B] shadow-inner shadow-md rounded-lg p-6 text-white mt-6 mb-4">
                    <h1 className="mont text-white text-2xl md:text-3xl text-center text-wrap">ready to join?</h1>
                    <Link to={"/signup/"}><Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB] drop-shadow active:translate-y-0.5">SIGN UP</Button></Link>
                </div>
            </div>
        </div>
        
    );
}

const mapStateToProps = state => ({
    isClientView: state.ui.isClientView,
    access: state.auth.access,
    refresh: state.auth.refresh
});

export default connect(mapStateToProps, { })(Landing);