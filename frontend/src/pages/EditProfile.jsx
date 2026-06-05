import {useEffect,useState} from "react"
import API from "../api/axios"
import {useNavigate} from "react-router-dom"


function EditProfile(){


const navigate = useNavigate()


const [form,setForm] = useState({

    education:"",
    designation:"",
    bio:"",
    interests:""

})







useEffect(()=>{

    getProfile()

},[])








const getProfile = async()=>{


    const res = await API.get(
        "/users/me"
    )


    setForm({

        education: res.data.education || "",

        designation: res.data.designation || "",

        bio: res.data.bio || "",

        interests: res.data.interests?.join(", ") || ""

    })


}









const updateProfile = async()=>{


    await API.put(
        "/users/me",
        {

            education:form.education,

            designation:form.designation,

            bio:form.bio,

            interests:form.interests.split(",")

        }
    )


    navigate("/profile")


}











return (

<div className="max-w-3xl mx-auto mt-16 px-6">





<div
className="
bg-slate-800
p-10
rounded-2xl
border
border-slate-700
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

Edit Profile

</h1>









<label className="font-light text-gray-300">

Education

</label>



<input

className="
w-full
bg-slate-900
border
border-slate-700
px-5
py-3
rounded-xl
mt-2
mb-6
outline-none
font-light
focus:border-blue-500
"

value={form.education}

onChange={(e)=>{

setForm({

...form,

education:e.target.value

})

}}

/>









<label className="font-light text-gray-300">

Designation

</label>




<input

className="
w-full
bg-slate-900
border
border-slate-700
px-5
py-3
rounded-xl
mt-2
mb-6
outline-none
font-light
focus:border-blue-500
"

value={form.designation}

onChange={(e)=>{

setForm({

...form,

designation:e.target.value

})

}}

/>










<label className="font-light text-gray-300">

Bio

</label>





<textarea

className="
w-full
h-32
bg-slate-900
border
border-slate-700
px-5
py-3
rounded-xl
mt-2
mb-6
outline-none
resize-none
font-light
leading-7
focus:border-blue-500
"


value={form.bio}


onChange={(e)=>{

setForm({

...form,

bio:e.target.value

})

}}


/>









<label className="font-light text-gray-300">

Interests

</label>





<input

className="
w-full
bg-slate-900
border
border-slate-700
px-5
py-3
rounded-xl
mt-2
mb-8
outline-none
font-light
focus:border-blue-500
"


value={form.interests}


onChange={(e)=>{

setForm({

...form,

interests:e.target.value

})

}}


/>











<button

onClick={updateProfile}

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



export default EditProfile