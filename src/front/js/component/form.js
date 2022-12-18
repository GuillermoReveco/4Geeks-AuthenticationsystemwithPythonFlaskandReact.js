import React, {useEffect} from "react"
import { useContext } from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Form = (props)=>{
    const {  actions, store } = useContext(Context);
    const { rescatarToken, obtenerPassword, obtenerEmail, grabarUser }= actions;
    const { password, email} = store;
    const navigate = useNavigate();

    useEffect(()=>{
        if(store.token !== null){
            console.log('useEffect - va private');
            navigate('/private')
            console.log('useEffect - FIN - va private');
        }
	},[store.token])

    const handleClick=()=>{
        rescatarToken(email,password)
        // navigate('/home')
    }

    const grabarUsuario = () =>{
        grabarUser(email,password)
        navigate('/')
    }

    return(
        <div>
        <form>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onKeyUp={obtenerEmail}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onKeyUp={obtenerPassword}/>
        </div>
        <div className="mb-3 form-check">
        </div>
       
        </form>
            {
                props.tipo=="singin"?
                    <Link to='/'><button  className="btn btn-primary" onClick={()=>grabarUsuario()}>Submit</button></Link>
                    :
                    <button  className="btn btn-primary" onClick={()=>handleClick()}>Submit</button>
            }
        </div>
    )

}

