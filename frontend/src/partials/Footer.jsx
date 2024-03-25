import { Link } from 'react-router-dom';
import './partials.css';

function Footer () {
    const email = 'info@plotter.com';
    const tele = '2815550000'
    return (
        <div className='footer'>
                <div className='skeleton'>
                    <h3 className='footer_logo'>plotter</h3>
                        <ul className='nav_list'>
                            <li><Link className="nav_item" to={""}>HOME</Link></li>
                            <li><Link className="nav_item" to={""}>CLIENTS</Link></li>
                            <li><Link className="nav_item" to={""}>LISTS</Link></li>
                        </ul> 
                </div>
                <div className='contact_info'>
                    <h3 className="getin_touch"> get in touch. </h3>
                    {/* <Link to={`https://maps.app.goo.gl/9sXqG2uVtjWWJtXA8`}><p className='map_link'> Physical Address </p></Link> */}
                    <Link to={`mailto:${email}`}><p className='contact_links'>Email Us</p></Link>
                    <Link to={`tel:${tele}`}><p className='contact_links'>Call Us</p></Link>
                    <Link to={"http://www.instagram.com/thegallerythegallerythegallery/"}>
                        <img className='iglogo' src="https://i.imgur.com/SILGJAg.png" alt="ig logo" /></Link>
                </div>
                <div className='hours'>
                </div>
        </div>
    )
}

export default Footer