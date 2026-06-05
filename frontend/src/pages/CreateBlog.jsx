import {useState} from "react"
import API from "../api/axios"
import {useNavigate} from "react-router-dom"


function CreateBlog(){


const navigate = useNavigate()


const [blog,setBlog] = useState({

    title:"",
    content:"",
    tags:""

})


const [loading,setLoading] = useState(false)







const handleChange=(e)=>{


    setBlog({

        ...blog,

        [e.target.name]:e.target.value

    })


}








const createBlog=async()=>{


    await API.post(
        "/blogs/create",
        {

            title:blog.title,

            content:blog.content,

            tags:blog.tags.split(",")

        }
    )


    navigate("/")


}








const improveWithAI=async()=>{


    setLoading(true)


    const res = await API.post(
        "/ai/improve",
        {
            content:blog.content
        }
    )


    setBlog({

        ...blog,

        content:res.data.suggestion

    })


    setLoading(false)


}









return(

<div className="max-w-5xl mx-auto mt-14 px-6">





<h1
className="
text-4xl
font-light
tracking-wide
mb-10
"
>

Create Blog

</h1>









<div
className="
bg-slate-800
border
border-slate-700
rounded-2xl
p-10
shadow-[0_0_40px_rgba(37,99,235,0.12)]
"
>







<input

name="title"

value={blog.title}

onChange={handleChange}

placeholder="Title"

className="
w-full
bg-transparent
outline-none
text-4xl
font-light
tracking-wide
placeholder-gray-500
mb-10
"

/>








<textarea

name="content"

value={blog.content}

onChange={handleChange}

placeholder="Write your blog..."

className="
w-full
h-80
bg-transparent
outline-none
resize-none
text-xl
leading-loose
font-light
placeholder-gray-500
"

/>









<div
className="
flex
justify-between
items-center
mt-10
"
>







<button

onClick={improveWithAI}

className="
border
border-purple-500
px-5
py-2
rounded-lg
font-light
hover:bg-purple-500
transition
"
>

{
loading
?
"Improving..."
:
" Improve with AI"
}

</button>









<div className="flex gap-4">



<input

name="tags"

value={blog.tags}

onChange={handleChange}

placeholder="Tags"

className="
bg-slate-900
border
border-slate-700
rounded-lg
px-4
outline-none
font-light
focus:border-blue-500
"

/>







<button

onClick={createBlog}

className="
bg-blue-600
px-7
py-2
rounded-lg
font-medium
hover:bg-blue-700
transition
"
>

Publish 

</button>





</div>







</div>







</div>






</div>


)


}


export default CreateBlog