import {useEffect, useState} from "react"
import API from "../api/axios"
import {useNavigate, Link} from "react-router-dom"


function Home(){


const navigate = useNavigate()

const [blogs,setBlogs] = useState([])



useEffect(()=>{

    fetchBlogs()

},[])



const fetchBlogs = async()=>{


    const res = await API.get(
        "/blogs"
    )


    setBlogs(res.data)

}







return (

<div className="max-w-6xl mx-auto mt-20 px-4">






{/* HERO */}


<div className="mb-20">


<div className="flex justify-between items-center gap-20">





{/* LEFT */}


<div>


<h1
className="
text-6xl
font-light
tracking-wide
mb-6
"
>

Welcome to <span className="font-medium">NEXUS</span>

</h1>



<p
className="
text-gray-400
text-xl
font-light
"
>

Connecting minds across the silicon universe

</p>


</div>








{/* RIGHT NEXUS CHIP */}


<div
className="
hidden
md:flex
relative
w-80
h-64
items-center
justify-center
"
>



{/* chip */}


<div
className="
relative
z-10
w-36
h-36
rounded-2xl
bg-slate-900
border
border-blue-400/60
flex
items-center
justify-center
shadow-[0_0_80px_rgba(59,130,246,0.35)]
"
>


<span
className="
text-blue-300
tracking-[0.25em]
font-medium
"
>

NEXUS

</span>



</div>








{/* left traces */}


<div className="absolute left-4 top-20 w-32 border-t border-blue-400/40"></div>
<div className="absolute left-14 top-28 w-24 border-t border-blue-400/40"></div>
<div className="absolute left-8 top-36 w-28 border-t border-blue-400/40"></div>
<div className="absolute left-20 top-44 w-16 border-t border-blue-400/40"></div>






{/* right traces */}


<div className="absolute right-4 top-20 w-32 border-t border-blue-400/40"></div>
<div className="absolute right-20 top-28 w-16 border-t border-blue-400/40"></div>
<div className="absolute right-8 top-36 w-28 border-t border-blue-400/40"></div>
<div className="absolute right-14 top-44 w-24 border-t border-blue-400/40"></div>








{/* top traces */}


<div className="absolute top-0 left-28 h-24 border-l border-blue-400/40"></div>
<div className="absolute top-8 left-36 h-16 border-l border-blue-400/40"></div>
<div className="absolute top-4 left-44 h-20 border-l border-blue-400/40"></div>
<div className="absolute top-12 left-52 h-12 border-l border-blue-400/40"></div>







{/* bottom traces */}


<div className="absolute bottom-0 left-28 h-24 border-l border-blue-400/40"></div>
<div className="absolute bottom-8 left-36 h-16 border-l border-blue-400/40"></div>
<div className="absolute bottom-4 left-44 h-20 border-l border-blue-400/40"></div>
<div className="absolute bottom-12 left-52 h-12 border-l border-blue-400/40"></div>




</div>




</div>








{/* SEARCH */}


<div className="flex gap-5 mt-18">


<input

readOnly

onClick={()=>navigate("/search")}

placeholder="Search circuits, processors, architectures..."

className="
flex-1
bg-slate-800
border
border-slate-700
rounded-xl
px-6
py-4
text-lg
font-light
outline-none
cursor-pointer
hover:border-blue-500
transition
"

/>




<button

onClick={()=>{

    const token = localStorage.getItem("token")

    if(token){

        navigate("/create")

    }

    else{

        navigate("/login")

    }

}}

className="
bg-blue-600
px-8
rounded-xl
font-medium
hover:bg-blue-700
transition
"

>

+ Create Blog

</button>


</div>



</div>









<h1
className="
text-3xl
font-light
tracking-wide
mb-8
"
>

Explore Knowledge

</h1>









<div className="space-y-7">


{

blogs.map((blog)=>(


<div

key={blog.id}

className="
bg-slate-800
rounded-xl
p-6
border
border-slate-700
hover:border-blue-500
transition
"

>


<div className="flex justify-between">


<h2 className="text-2xl font-semibold">

{blog.title}

</h2>



<p className="text-gray-400 font-light">

{blog.author_name}

</p>


</div>





<p className="mt-4 text-gray-300 font-light">

{blog.content.slice(0,150)}...

</p>





<div className="mt-5">


<Link

className="text-blue-400 font-light"

to={`/blog/${blog.id}`}

>

Read More →

</Link>


</div>



</div>


))

}


</div>



</div>

)


}


export default Home