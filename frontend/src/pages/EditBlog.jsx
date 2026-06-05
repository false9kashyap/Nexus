import {useEffect,useState} from "react"
import {useParams,useNavigate} from "react-router-dom"
import API from "../api/axios"


function EditBlog(){


const {id}=useParams()

const navigate=useNavigate()


const [title,setTitle]=useState("")
const [content,setContent]=useState("")
const [tags,setTags]=useState("")





useEffect(()=>{

    getBlog()

},[])






const getBlog=async()=>{


    const res=await API.get(
        `/blogs/${id}`
    )


    setTitle(res.data.title)

    setContent(res.data.content)

    setTags(res.data.tags.join(", "))

}








const updateBlog=async()=>{


    await API.put(
        `/blogs/${id}`,
        {

            title:title,

            content:content,

            tags:tags.split(",")

        }
    )


    navigate("/profile")


}









return (

<div className="max-w-4xl mx-auto mt-16 px-6">



<div
className="
bg-slate-800
rounded-2xl
border
border-slate-700
p-10
shadow-[0_0_40px_rgba(37,99,235,0.15)]
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

Edit Blog

</h1>








<input

className="
bg-slate-900
w-full
px-5
py-4
rounded-xl
outline-none
mb-5
border
border-slate-700
font-light
focus:border-blue-500
"

placeholder="Title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>









<textarea

className="
bg-slate-900
w-full
h-80
px-5
py-4
rounded-xl
outline-none
mb-5
border
border-slate-700
font-light
leading-8
resize-none
text-justify
focus:border-blue-500
"

placeholder="Content"

value={content}

onChange={(e)=>setContent(e.target.value)}

/>









<input

className="
bg-slate-900
w-full
px-5
py-4
rounded-xl
outline-none
mb-8
border
border-slate-700
font-light
focus:border-blue-500
"

placeholder="Tags separated by comma"

value={tags}

onChange={(e)=>setTags(e.target.value)}

/>











<button

onClick={updateBlog}

className="
bg-blue-600
px-8
py-3
rounded-xl
font-medium
hover:bg-blue-700
transition
"

>

Save Changes

</button>





</div>


</div>

)


}


export default EditBlog