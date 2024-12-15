import { Link } from "react-router-dom";
import { Image, Button } from "semantic-ui-react";

function Landing() {
    return (
        <div className="flex flex-col items-center justify-evenly">  
            <div className="w-3/4 max-w-[800px] p-5 mt-5 flex flex-col bg-[#26282B] shadow-inner shadow-md rounded-lg">
                <div className="mb-3 mt-4">                
                        <Image className="plotter-banner" src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1006.png" />
                        <p className="mont text-[#5F85DB] text-2xl md:text-4xl text-center text-wrap">a new way to locate</p>
                </div>
                <div className="flex flex-col lg:flex-row text-center">
                    <div className="flex flex-col px-4">
                        <p className="text-white">At Atlas, our mission is to streamline the apartment locating process for real estate agents. Instead of juggling multiple platforms or outdated tools, Atlas is designed to be your one-stop shop for sending your clients the perfect options. </p>
                        <p className="text-white">The platform is built on three core pillars: clients, lists, and deals. At the heart of your business is your client. The reason you brew that morning coffee is to help them find the best units that suit their needs and timeline. We understand this fact, so we’ve centralized everything around your client to make their journey as smooth as possible.</p>
                        <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1008.png"/>
                    </div>
                    <div className="flex flex-col px-4">
                        <p className="text-white">The second pillar is our powerful list-making feature—the true workhorse of Atlas. While crafting lists, you can browse properties across your region, select units, and add any important details such as specials or notes. When you're ready to send, Atlas packages everything into a unique, shareable link for your client.</p>
                        <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1009.png"/>  
                        <p className="text-white">The third pillar is the deal tracker. Once you've found your client the perfect place, it’s crucial to record their lease details and stay on top of payment deadlines. Atlas' deal-tracking tools notify you about important updates, so nothing slips through the cracks.</p>
                    </div>
                    <div className="flex flex-col px-4">
                        <Image src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1010.png"/>  
                        <p className="text-white">From your dashboard, you'll also see daily stats like upcoming move-ins and renewal timeframes. We’re currently developing a comprehensive stats feature (exciting, right?) to track everything from most-recommended properties to most-leased, and beyond.</p>
                        <p className="text-white">Atlas is 100% free for licensed real estate agents. Simply sign up, provide your TREC details after activating your account, and a member of our team will confirm everything afterward. </p>
                    </div>
                </div>
           
            </div>
            <div className="w-3/4 max-w-[800px] p-5 mt-8 flex flex-col items-center bg-[#26282B] shadow-inner shadow-md rounded-lg mb-10">        
                <h1 className="mont text-white text-2xl md:text-3xl text-center text-wrap">ready to join atlas?</h1>
                <Link to={"/signup/"}><Button className="mt-4 !bg-[#90B8F8] hover:!bg-[#5F85DB] drop-shadow">SIGN UP</Button></Link>
            </div>
        </div>
        
    );
}

export default Landing;
