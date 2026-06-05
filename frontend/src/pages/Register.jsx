import { useState } from "react"
import API from "../api/axios"
import { useNavigate, Link } from "react-router-dom"


function Register() {

    const navigate = useNavigate()


    const [form, setForm] = useState({

        name: "",
        email: "",
        password: "",
        education: "",
        designation: "",
        interests: ""

    })



    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        })

    }




    const register = async () => {

        try {

            const userData = {

                name: form.name,

                email: form.email,

                password: form.password,

                college: form.education,

                profession: form.designation,

                interests: form.interests

            }



            console.log(userData)



            await API.post(

                "/auth/register",

                userData

            )



            navigate("/login")


        } catch (error) {


            console.log(
                error.response?.data
            )


            alert(

                error.response?.data?.detail ||

                "Registration failed"

            )

        }

    }







    return (

        <div
            className="
            min-h-[85vh]
            flex
            items-center
            justify-center
            pt-16
            pb-10
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

                    Join NEXUS

                </h1>




                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="input-style"
                />



                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="input-style"
                />



                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="input-style"
                />



                <input
                    name="education"
                    placeholder="Education"
                    onChange={handleChange}
                    className="input-style"
                />



                <input
                    name="designation"
                    placeholder="Designation"
                    onChange={handleChange}
                    className="input-style"
                />



                <input
                    name="interests"
                    placeholder="Interests (VLSI, processors, CPU)"
                    onChange={handleChange}
                    className="input-style"
                />






                <button

                    onClick={register}

                    className="
                    w-full
                    bg-blue-600
                    py-3
                    rounded-xl
                    font-medium
                    hover:bg-blue-700
                    transition
                    mt-3
                    "

                >

                    Create Account

                </button>







                <p
                    className="
                    text-center
                    text-gray-400
                    font-light
                    mt-6
                    "
                >


                    Already a user?{" "}


                    <Link

                        to="/login"

                        className="
                        text-blue-400
                        hover:text-blue-500
                        transition
                        "

                    >

                        Login

                    </Link>



                </p>



            </div>



        </div>


    )

}


export default Register