import {Link, useNavigate, useLocation} from "react-router-dom"
import {useEffect, useState} from "react"


function Navbar(){


const navigate = useNavigate()
const location = useLocation()


const [loggedIn,setLoggedIn] = useState(false)





useEffect(()=>{

    const token = localStorage.getItem("token")

    setLoggedIn(
        !!token
    )


},[location])







const logout = ()=>{


    localStorage.removeItem(
        "token"
    )


    setLoggedIn(false)


    navigate("/login")


}









return (

<div
className="
h-16
px-10
flex
items-center
justify-between
border-b
border-blue-900
shadow-[0_0_25px_rgba(37,99,235,0.50)]
"
>



<Link

to="/"

className="
text-3xl
font-light
tracking-[0.4em]
"

>

NEXUS

</Link>







<div className="flex
gap-8
text-lg
font-light
tracking-wide
text-gray-200
">



{

loggedIn ? (

<>


<Link to="/profile">

Profile

</Link>



<button onClick={logout}>

Logout

</button>


</>


)

:

(

<>


<Link to="/login">

Login

</Link>



<Link to="/register">

Register

</Link>


</>

)

}



</div>



</div>

)


}


export default Navbar