import { Link, useNavigate } from "react-router-dom";
import { Button, Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { reset_client_view } from "../store/actions/ui";
import { connect } from "react-redux";
import LandingLoop from "../elements/0224.mp4";

function Landing({ access, refresh }) {
    const navigate = useNavigate();
    const [imageLoad, setImageLoad] = useState(false)

    useEffect(() => {
        reset_client_view()

        if (access && refresh) {
            navigate('/dashboard/home')
        }
        
    }, [access, refresh, navigate])

    useEffect(() => {
        const preloadImage = (url) => {
            const img = new Image();
            img.src = url;
            if (url === 'https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1008.png') {
                img.onload = () => setImageLoad(true);
            } 

        };
          
        const imageUrls = [
            "https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1006.png",
            "https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1010.png",
            "https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1009.png",
            "https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1008.png",
        ];
          
        imageUrls.forEach(preloadImage);
    }, []);

    return (
        <div className="flex flex-col items-center justify-evenly animator">  
            {!imageLoad ? (
                <>
                    <Loader active/>
                </>
            ) : (
                <div className="flex flex-col bg-[#e4e0d9] flex flex-col items-center justify-center">
                    <div className="bg-white flex items-center w-full justify-center pb-10 pl-5 pr-5">
                        <div className="w-1/2 ">
                            <img className="drop-shadow-md" src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1006.png" alt='main-header'/>
                        </div>
                        <div className="w-1/2 mt-8">
                            <p className="mont drop-shadow text-[#5F85DB] text-xl sm:text-4xl lg:text-5xl xl:text-6xl text-center text-nowrap mb-4 mt-2">a new way to locate</p>
                        </div>    
                    </div>
                   
                    <div className="flex flex-col sm:flex-row items-center w-full justify-evenly shadow-inner-sm">
                        <div className="w-full sm:w-1/3 flex flex-col items-center justify-between ml-0 sm:ml-10 p-5 sm:p-0 mt-4 sm:mt-10 text-center max-h-1/3 mb-5">
                            <p className="text-white uppercase font-semibold bg-[#4d6cb2] shadow-inner shadow-md rounded-xl p-8">Our mission is to streamline the entire apartment locating process for real estate agents </p>
                            <p className="text-white text-sm bg-[#3a528a] shadow-inner shadow-md rounded-xl p-8">Instead of juggling multiple platforms and outdated tools, Atlas is designed to become the one-stop shop for daily work.</p>
                        </div>
                        <div className="w-2/3 sm:w-1/2 mb-5">
                            <img src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1009.png" className="drop-shadow" alt="sub-header-1"/>  

                        </div>    
                    </div>

                    <div className="flex flex-col bg-[#d0ccc5] shadow-inner-sm drop-shadow-xl rounded-bl-2xl rounded-br-2xl p-6 text-[#26282B] w-full z-40">
                        <p className="text-center">Atlas is built on three core pillars: <b>clients</b>, <b>lists</b>, and <b>deals.</b> </p>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start p-3 w-full">
                            <div className="flex flex-col items-center justify-center w-full sm:w-1/3 pr-6 pl-6">
                                <i className="users icon !text-6xl !mb-2 !text-[#5F85DB]"></i>
                                <p className="">At the heart of your business is your <b>client</b>. They're the reason you brew that morning coffee. We understand that finding the best deals is usually client-specific, so we’ve centralized everything in Atlas around each one in order to make their journeys as smooth as possible.</p>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full sm:w-1/3 pr-6 pl-6">
                                <i className="list alternate icon !text-6xl !mb-2 !text-[#5F85DB]"></i>
                                <p className="">Next is our <b>list</b>-making feature. The true workhorse of Atlas. Powerful, lean & majestic. While crafting lists, you can browse properties across your region, select units, and add any important details such as specials or notes. When you're ready to send, Atlas packages everything into a unique, shareable link for your client.</p>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full sm:w-1/3 pr-6 pl-6">
                                <i className="chart pie icon !text-6xl !mb-2 !text-[#5F85DB]"></i>
                                <p>Last but certaintly not least is the <b>deal</b> tracker. Once you've found your client the perfect place, it’s crucial to record their lease details and stay on top of payment deadlines. Atlas' deal-tracking tools notify you about important updates, so nothing slips through the cracks.</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-1/3 bg-black shadow-inner z-30 -mt-4 -mb-4">
                        <video autoPlay loop muted playsInline className="opacity-40 hover:opacity-90 w-full h-full object-cover">
                            <source src={LandingLoop} />
                        </video>
                    </div>

                    <div className="bg-[#bfbbb6] flex flex-col sm:flex-row items-center w-full justify-evenly drop-shadow-xl shadow-inner-sm rounded-tl-2xl rounded-tr-2xl z-40">
                        <div className="w-2/3 sm:w-1/2 mt-4 sm:mt-0">
                            <img src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1010.png" className="drop-shadow-md" alt='sub-header-0'/>  
                        </div>   
                        <div className="w-full sm:w-1/3 flex flex-col items-center justify-between mr-0 sm:mr-10 p-5 sm:p-0 mt-0 sm:mt-10 mb-8 text-center max-h-1/3">
                            <p className="text-white text-sm bg-[#5F85DB] shadow-inner shadow-md rounded-xl p-8">From your dashboard, you'll see daily stats like upcoming move-ins and renewal timeframes and monthly reports like income summaries and overdues. 
                            </p>
                            <p className="text-white text-sm bg-[#4d6cb2] shadow-inner shadow-md rounded-xl p-8">The dashboard also has the ability to check current commission rates, send guest cards, set to-do's and calculate net effective rates.</p>    
                            <p className="text-white text-sm bg-[#3a528a] shadow-inner shadow-md rounded-xl p-8">    
                                And we're currently developing a comprehensive stats feature (exciting, right?) to track everything from most-recommended properties to most-leased, and beyond! 
                            </p>
                        </div>
                    </div>                    

                    <div className="bg-[#a5a29d] flex flex-col-reverse sm:flex-row items-center w-full justify-evenly z-40 shadow-inner-sm pb-5">
                        <div className="w-full sm:w-1/3 flex flex-col items-center mt-0 sm:mt-10 ml-0 sm:ml-10 p-4 justify-center mb- sm:mb-0">
                            <p className="mont drop-shadow text-white text-5xl xl:text-7xl text-center text-nowrap mb-4 mt-2">best part?</p>
                            <p className="w-full text-white font-semibold text-sm bg-[#4d6cb2] shadow-inner shadow-md text-center uppercase rounded-xl p-8">Atlas is 100% free right now. </p>
                            <p className="w-full text-white text-sm bg-[#3a528a] shadow-inner shadow-md rounded-xl p-8 ">
                            Simply sign up, provide your TREC ID after activating your account, and a member of our team will confirm everything afterward.
                            </p>
                        </div>
                        <div className="w-2/3 sm:w-1/2 mt-4 sm:mt-0">
                            <img src="https://plotter-medi-0814.s3.us-east-2.amazonaws.com/1008.png" className="drop-shadow-md" alt="sub-header-2"/>

                        </div>
                    </div>

                    <div className="bg-[#bfd0ccc5bbb6] flex flex-row items-start w-full justify-evenly shadow-inner-sm">
                        <div className="w-11/12 sm:w-1/2 flex flex-col items-center bg-[#26282B] shadow-inner shadow-md rounded-lg p-6 text-white mt-6 mb-6">
                            <h1 className="mont text-white text-2xl md:text-3xl text-center text-wrap">ready to join?</h1>
                            <Link to={"/signup/"}><Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB] hover:!text-white text-white drop-shadow active:translate-y-0.5">LET'S GO</Button></Link>
                        </div>
                    </div>
                 
                </div>
            )}        
        </div>
        
    );
}

const mapStateToProps = state => ({
    isClientView: state.ui.isClientView,
    access: state.auth.access,
    refresh: state.auth.refresh
});

export default connect(mapStateToProps, { })(Landing);