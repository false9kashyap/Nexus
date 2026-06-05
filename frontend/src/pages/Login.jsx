import {useState} from "react"
import API from "../api/axios"
import {useNavigate, Link} from "react-router-dom"


function Login(){


const navigate = useNavigate()


const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")





const login = async()=>{


    try{


        const res = await API.post(
            "/auth/login",
            {
                email:email.trim(),
                password
            }
        )


        localStorage.setItem(
            "token",
            res.data.access_token
        )


        navigate("/")


    }


    catch(err){


        setError(
            err.response?.data?.detail || "Login failed"
        )


    }



}









return (

<div
className="
min-h-[80vh]
flex
items-center
justify-center
"
>


<div
className="
w-105
bg-slate-800
border
border-slate-700
rounded-2xl
p-10
shadow-[0_0_40px_rgba(37,99,235,0.15)]
"
>





<h1
className="
text-4xl
font-light
tracking-wide
mb-3
"
>

Login

</h1>





<p
className="
text-gray-400
font-light
mb-10
"
>

Access your silicon space

</p>








<input

value={email}

onChange={(e)=>setEmail(e.target.value)}

placeholder="Email"

className="
w-full
bg-slate-900
border
border-slate-700
rounded-xl
px-5
py-3
mb-5
outline-none
font-light
focus:border-blue-500
"

/>









<input

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

placeholder="Password"

className="
w-full
bg-slate-900
border
border-slate-700
rounded-xl
px-5
py-3
mb-5
outline-none
font-light
focus:border-blue-500
"

/>









{
error &&

<p
className="
text-red-400
font-light
mb-5
"
>

{error}

</p>

}











<button

onClick={login}

className="
w-full
bg-blue-600
py-3
rounded-xl
font-medium
hover:bg-blue-700
transition
"

>

Login

</button>









<p
className="
text-center
text-gray-400
font-light
mt-6
"
>

New to NEXUS?{" "}

<Link
to="/register"
className="text-blue-400"
>

Create account

</Link>


</p>







</div>


</div>

)


}


export default Login