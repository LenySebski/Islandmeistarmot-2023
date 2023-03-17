import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
	const { user } = useContext(UserContext);
	return (
		<footer className='footer__wrapper'>
			<div className='footer__column1'>
				<p className='footer__description'>
					CATalog is a website dedicated to helping cat owners find their
					lost pets. Whether you are an owner looking for a beloved cat or
					just a cat lover who wants to help lost cats this site is for
					you!
				</p>
			</div>
			<div className='footer__column2'>
				<h4 className='footer__header'>Menu</h4>
				<>
					<Link to='/signup'>Sign Up</Link>
					<Link to='/login'>Sign In</Link>
					<Link to='/'>Database</Link>
					{user?.user && <Link to='/newpost'>Add a Bite</Link>}
				</>
			</div>
			<div className='footer__column3'>
				<h4 className='footer__header'>Contact Us</h4>
				<a href='catalog@catalog.com' className='footer__email'>
					bite@buddy.is
				</a>
				<a className='footer__social' href='www.facebook.com'>
					<FontAwesomeIcon icon={faFacebook} />
				</a>
				<a className='footer__social' href='www.instagram.com'>
					<FontAwesomeIcon icon={faInstagram} />
				</a>
			</div>
		</footer>
	);
}
export default Footer;
