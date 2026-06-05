import {useEffect,useState} from "react"
import {useParams,useNavigate} from "react-router-dom"
import API from "../api/axios"


function PublicProfile(){


const {id}=useParams()

const navigate=useNavigate()


const [user,setUser]=useState(null)





useEffect(()=>{

    getUser()

},[])






const getUser=async()=>{


    const res=await API.get(
        `/users/${id}`
    )


    setUser(res.data)

}









if(!user){

return <h1>Loading...</h1>

}









return (

<div className="max-w-5xl mx-auto mt-12 px-6">







{/* PROFILE CARD */}


<div
className="
bg-slate-800
rounded-xl
p-10
border
border-slate-700
"
>





<h1
className="
text-4xl
font-light
tracking-wide
mb-10
"
>

{user.name}

</h1>









<div className="space-y-5 text-gray-300 font-light">



<p>

<span className="font-medium text-white">

Education:

</span>

{" "}{user.education}

</p>








<p>

<span className="font-medium text-white">

Designation:

</span>

{" "}{user.designation}

</p>









<p>

<span className="font-medium text-white">

Bio:

</span>

{" "}{user.bio}

</p>





</div>










<h2
className="
text-2xl
font-light
tracking-wide
mt-10
mb-6
"
>

Interests

</h2>








<div className="flex gap-3 flex-wrap">


{
user.interests?.map((i,index)=>(



<span

key={index}

className="
bg-blue-600
px-5
py-2
rounded-full
font-light
"

>

{i}

</span>



))

}


</div>





</div>












{/* BLOGS */}



<h2
className="
text-3xl
font-light
tracking-wide
mt-14
mb-8
"
>

Blogs

</h2>








{
user.blogs.length===0 &&


<p className="text-gray-400 font-light">

No blogs published yet.

</p>

}









{
user.blogs.map((blog)=>(




<div

key={blog.id}

onClick={()=>navigate(`/blog/${blog.id}`)}

className="
bg-slate-800
border
border-slate-700
rounded-xl
p-6
mb-5
cursor-pointer
hover:border-blue-500
transition
"

>







<h3
className="
text-2xl
font-medium
mb-5
"
>

{blog.title}

</h3>









<div className="flex gap-3 flex-wrap">


{
blog.tags?.map((tag,index)=>(



<span

key={index}

className="
bg-slate-700
px-3
py-1
rounded-full
text-sm
font-light
"

>

{tag}

</span>



))

}



</div>






</div>



))

}







</div>


)


}



export default PublicProfile