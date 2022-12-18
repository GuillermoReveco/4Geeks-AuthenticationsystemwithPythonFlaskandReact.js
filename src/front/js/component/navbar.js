import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {  actions, store } = useContext(Context);
	const {borrarToken} = actions
	const navigate = useNavigate();

	function logOut(){
		sessionStorage.removeItem("token")
		borrarToken();
		navigate('/')
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/singin">
					<span className="navbar-brand mb-0 h1">SingIn</span>
				</Link>
				<div className="ml-auto">
					{
					store.token==null?
					<Link to="/"><button className="btn btn-primary">Login</button></Link>:
					<Link to="/"><button className="btn btn-primary" onClick={logOut}>LogOut</button></Link>
					}	
				</div>

			</div>
		</nav>
	);
};
