import {useEffect,useState} from "react"
import API from "../api/axios"
import {useNavigate} from "react-router-dom"



function Profile(){


const [user,setUser] = useState(null)

const [blogs,setBlogs] = useState([])

const navigate = useNavigate()





useEffect(()=>{

    getProfile()

    getMyBlogs()

},[])







const getProfile = async()=>{


    const res = await API.get(
        "/users/me"
    )


    setUser(res.data)

}









const getMyBlogs = async()=>{


    const res = await API.get(
        "/blogs/my"
    )


    setBlogs(res.data)

}









const deleteBlog = async(id)=>{


    await API.delete(
        `/blogs/${id}`
    )


    getMyBlogs()

}





const logout = ()=>{


    localStorage.removeItem("token")


    navigate("/login")


}




if(!user){

return <h1>Loading...</h1>

}










return (

<div className="max-w-5xl mx-auto mt-16 px-6">







{/* PROFILE CARD */}


<div

className="
bg-slate-800
rounded-xl
p-10
border
border-slate-700
relative
"

>





<div
className="
absolute
top-6
right-6
flex
gap-4
"
>


<button

onClick={()=>navigate("/edit-profile")}

className="
bg-blue-600
px-5
py-2
rounded-lg
font-light
hover:bg-blue-700
transition
"

>

Edit Profile

</button>





<button

onClick={logout}

className="
border
border-red-400
text-red-400
px-5
py-2
rounded-lg
font-light
hover:bg-red-500
hover:text-white
transition
"

>

Logout

</button>



</div>




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









<div
className="
space-y-5
text-gray-300
font-light
"
>


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

(
    Array.isArray(user.interests)
        ? user.interests
        : user.interests
            ? [user.interests]
            : []
).map((interest,index)=>(


<span

key={index}

className="
bg-blue-600
px-4
py-2
rounded-full
font-light
"

>

{interest}

</span>


))

}


</div>


</div>













<h1
className="
text-4xl
font-light
tracking-wide
mt-14
mb-10
"
>

My Blogs

</h1>












{

blogs.map((blog)=>(



<div

key={blog.id}

onClick={()=>navigate(`/blog/${blog.id}`)}

className="
bg-slate-800
border
border-slate-700
rounded-xl
p-6
mb-6
cursor-pointer
hover:border-blue-500
transition
"

>






<h2
className="
text-2xl
font-medium
mb-5
"
>

{blog.title}

</h2>








<p
className="
text-gray-400
font-light
"
>

{blog.content?.slice(0,150)}...

</p>










<div className="flex gap-3 mt-5 flex-wrap">


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










<div className="flex gap-8 mt-6">






<button

onClick={(e)=>{

    e.stopPropagation()

    navigate(`/blog/${blog.id}`)

}}

className="
text-blue-400
font-light
hover:text-blue-500
"

>

Read →

</button>








<button

onClick={(e)=>{

    e.stopPropagation()

    navigate(`/edit/${blog.id}`)

}}

className="
text-yellow-400
font-light
hover:text-yellow-500
"

>

Edit

</button>









<button

onClick={(e)=>{

    e.stopPropagation()

    deleteBlog(blog.id)

}}

className="
text-red-400
font-light
hover:text-red-500
"

>

Delete

</button>







</div>





</div>


))

}





</div>

)


}



export default Profile