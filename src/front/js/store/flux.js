const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			password:"",
			email:"",
			token:null,
			protegido:""
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			rescatarToken: async (email,password)=>{
				try{

					const resp= await fetch(`https://3001-4geeksacade-reactflaskh-c41kz2eldul.ws-us79.gitpod.io/api/login`,
					{
						method:'POST',
						headers:{
							'Content-Type':'application/json'
						},
						body:JSON.stringify({"email":email,
						"password":password})
					})
					if (resp.status!==200){
						
						alert("there has been some error")
						return false
					} 
					const data = await resp.json();
					console.log("Data backend", data)
					sessionStorage.setItem("token", data.token);
					setStore({token:data.token})
					// console.log(getStore().token)
					return true
				}
				
				catch(error){
					console.error('Error: ',error)
					console.log(sessionStorage.getItem("token"))
				}

				// console.log("tipo")
				//alert("Funciona: "+tipo)
			},
			obtenerPassword: ({target})=>{
				const {password }= getStore()
				setStore({password: target.value})
				// console.log(password)
			},
			obtenerEmail: ({target})=>{
				const {email }= getStore()
				setStore({email: target.value})
				// console.log(email)
			},

			conUsuario:()=>{
				console.log("Paso conUsuario: ")
				const token = sessionStorage.getItem('token');
				console.log("token: ",token)
				fetch('https://3001-4geeksacade-reactflaskh-c41kz2eldul.ws-us79.gitpod.io/api/user',{
					method: 'GET',
					mode: 'cors',
					headers:{ 
						"Content-Type": "application/json",
						'Authorization': 'Bearer '+token, // ⬅⬅⬅ authorization token}
						'Access-Control-Allow-Origin': '*',
					
					}
				})
				.then(response=>response.json())
				.then(data=>{
					console.log('protegio data: ',data)
					setStore({protegido:data})
					
				})

				.catch(error=>console.error('Error: ',error))
				
			},
			grabarUser:(email,password)=>{
				console.log("email: ",email)
				console.log("password: ",password)
				fetch('https://3001-4geeksacade-reactflaskh-c41kz2eldul.ws-us79.gitpod.io/api/user',{
					method:'POST',
					headers:{
						'Content-Type':'application/json',
					},
					body:JSON.stringify({"email":email,
					"password":password})
				})
				.then(response=>response.json())
				.then(data=>{console.log('Success: ',data)
				alert("Usuario Creado")
			})
				.catch(error=>console.error('Error: ',error))
			},
			getToken:()=>{
				return getStore().token
			},
			borrarToken:()=>{
				console.log('borrarToken')
				sessionStorage.removeItem("token");
				setStore({token:null})
			},
			syncTokenFromSessionStore:()=>{
				const token = sessionStorage.getItem("token")
				console.log("Aplication")
				if(token && token != "" && token!= undefined) setStore({token: token})
			}

		}
	};
};

export default getState;
