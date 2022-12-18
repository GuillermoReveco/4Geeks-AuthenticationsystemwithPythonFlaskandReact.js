import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const { protegido } = store;
	const {conUsuario, syncTokenFromSessionStore} = actions;
	const navigate = useNavigate();

	useEffect(()=>{
		console.log('useEffect - conUsuario');
		// actions.conUsuario();
		syncTokenFromSessionStore();
		conUsuario();
		console.log('UseEffect TOKEN: ', store.token) //= sessionStorage.getItem('token');
		console.log('useEffect - FIN - conUsuario');
		if(store.token==null){
			navigate('/')
		}

	},[])

	if(store.token!==null){
	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<h1>El usuario Conectado: {protegido.mail}</h1>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);}
	else{
		return <h1>No Autorizado</h1>
	}
};
