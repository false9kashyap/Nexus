import {useEffect,useState} from "react"
import {useParams,useNavigate} from "react-router-dom"
import API from "../api/axios"
import ReactMarkdown from "react-markdown"


function BlogDetails(){


const {id}=useParams()

const navigate = useNavigate()


const [blog,setBlog]=useState(null)
const [comment,setComment]=useState("")
const [rating,setRating]=useState(0)
const [summary,setSummary]=useState("")
const [question,setQuestion]=useState("")
const [answer,setAnswer]=useState("")




useEffect(()=>{

    getBlog()

},[])





const getBlog=async()=>{


    const res=await API.get(
        `/blogs/${id}`
    )


    setBlog(res.data)

}







const addComment=async()=>{


    await API.post(
        `/blogs/${id}/comment`,
        {
            text:comment
        }
    )


    setComment("")

    getBlog()

}






const deleteComment=async(index)=>{


    await API.delete(
        `/blogs/${id}/comment/${index}`
    )


    getBlog()

}






const addRating=async()=>{


    await API.post(
        `/blogs/${id}/rate`,
        {
            rating:Number(rating)
        }
    )


    setRating(0)

    getBlog()

}







const summarizeBlog=async()=>{


    const res=await API.get(
        `/ai/summarize/${id}`
    )


    setSummary(res.data.summary)

}








const askAI=async()=>{


    const res=await API.post(

        `/ai/ask/${id}`,

        {
            question
        }

    )


    setAnswer(res.data.answer)

    setQuestion("")

}







if(!blog){

return <h1>Loading...</h1>

}









return (

<div className="max-w-7xl mx-auto mt-16 px-6">


<div className="grid grid-cols-3 gap-14">








{/* LEFT */}


<div className="col-span-2">



<h1
className="
text-5xl
font-medium
tracking-wide
mb-6
"
>

{blog.title}

</h1>





<p className="text-gray-400 font-light mb-12">


Written by


<span

onClick={()=>navigate(`/profile/${blog.author_id}`)}

className="
text-blue-400
ml-2
cursor-pointer
hover:underline
"

>

{blog.author_name}

</span>


</p>








<p
className="
text-lg
font-light
leading-9
text-gray-200
text-justify
hyphens-auto
"
>

{blog.content}

</p>








{
summary &&


<div
className="
mt-12
bg-slate-800
border
border-slate-700
rounded-xl
p-6
"
>


<h2
className="
text-2xl
font-light
mb-5
"
>

AI Summary

</h2>



<div className="text-gray-300 leading-8 font-light">

<ReactMarkdown>

{summary}

</ReactMarkdown>

</div>



</div>

}










<h2
className="
text-3xl
font-light
tracking-wide
mt-14
mb-6
"
>

Comments

</h2>








<textarea

placeholder="Write comment..."

value={comment}

onChange={(e)=>setComment(e.target.value)}

className="
w-full
bg-slate-800
border
border-slate-700
rounded-xl
p-4
outline-none
font-light
focus:border-blue-500
"

>

</textarea>








<button

onClick={addComment}

className="
mt-4
bg-blue-600
px-5
py-2
rounded-lg
font-medium
hover:bg-blue-700
"

>

Add Comment

</button>










{
blog.comments?.map((c,index)=>(



<div

key={index}

className="
bg-slate-800
border
border-slate-700
rounded-xl
p-5
mt-5
"

>


<div className="flex justify-between">


<p className="font-medium">

{c.user_name}

</p>



<button

onClick={()=>deleteComment(index)}

className="
text-red-400
font-light
"

>

Delete

</button>


</div>





<p className="mt-3 text-gray-300 font-light">

{c.text}

</p>




</div>


))

}






</div>












{/* RIGHT */}



<div>


<div
className="
bg-slate-800
border
border-slate-700
rounded-xl
p-7
sticky
top-24
"
>





<h2
className="
text-2xl
font-light
mb-6
"
>

Rating: {blog.average_rating.toFixed(1)}

</h2>







<div className="flex gap-3 text-3xl mb-6">


{
[1,2,3,4,5].map((star)=>(


<button

key={star}

onClick={()=>setRating(star)}

>

{star<=rating ? "⭐" : "☆"}

</button>


))

}


</div>








<button

onClick={addRating}

className="
bg-blue-600
px-5
py-2
rounded-lg
font-medium
mb-12
"

>

Submit

</button>









<h2
className="
text-2xl
font-light
tracking-wide
mb-6
"
>

AI Assistant

</h2>








<button

onClick={summarizeBlog}

className="
bg-purple-600
w-full
py-3
rounded-lg
font-medium
mb-5
"

>

Summarize

</button>









<input

placeholder="Ask something..."

value={question}

onChange={(e)=>setQuestion(e.target.value)}

className="
bg-slate-900
border
border-slate-700
w-full
p-3
rounded-lg
outline-none
font-light
mb-4
"

>

</input>








<button

onClick={askAI}

className="
bg-blue-600
w-full
py-3
rounded-lg
font-medium
"

>

Ask AI

</button>








{
answer &&


<div className="mt-6 text-gray-300 font-light leading-7">


<ReactMarkdown>

{answer}

</ReactMarkdown>


</div>


}





</div>


</div>




</div>


</div>


)


}



export default BlogDetails