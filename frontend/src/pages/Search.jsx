import {useState} from "react"
import {useNavigate} from "react-router-dom"
import API from "../api/axios"
import {FiSearch} from "react-icons/fi"


function Search(){


const [query,setQuery]=useState("")
const [results,setResults]=useState([])

const navigate=useNavigate()





const searchBlogs=async()=>{


    const res=await API.post(
        "/search/",
        {
            query:query
        }
    )


    setResults(res.data)


}










return (

<div className="max-w-5xl mx-auto mt-16 px-6">





<h1
className="
text-4xl
font-light
tracking-wide
mb-3
"
>

Search

</h1>





<p
className="
text-gray-400
font-light
text-lg
mb-10
"
>

Find blogs through the silicon universe

</p>










<div
className="
flex
gap-4
bg-slate-800
p-4
rounded-xl
border
border-slate-700
"
>



<input

className="
flex-1
bg-transparent
outline-none
text-lg
font-light
tracking-wide
"

placeholder="Search processors, VLSI, architectures..."

value={query}

onChange={(e)=>setQuery(e.target.value)}

/>








<button

onClick={searchBlogs}

className="
bg-blue-600
px-8
py-3
rounded-lg
flex
items-center
gap-2
font-light
hover:bg-blue-700
transition
"

>

<FiSearch/>

Search

</button>




</div>











<div className="mt-10">



{
results.map((blog)=>(



<div

key={blog.id}

onClick={()=>navigate(`/blog/${blog.id}`)}

className="
bg-slate-800
border
border-slate-700
p-6
rounded-xl
mb-5
cursor-pointer
hover:border-blue-500
transition
"

>



<h2
className="
text-2xl
font-medium
tracking-wide
"
>

{blog.title}

</h2>





<p
className="
text-gray-400
font-light
mt-2
"
>

By {blog.author}

</p>





<p
className="
text-blue-400
font-light
mt-3
"
>

Match: {(blog.score*100).toFixed(1)}%

</p>




</div>



))

}




</div>





</div>

)


}


export default Search