import {
  Routes,
  Route
} from "react-router-dom"


import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreateBlog from "./pages/CreateBlog"
import BlogDetails from "./pages/BlogDetails"
import Profile from "./pages/Profile"
import EditBlog from "./pages/EditBlog"
import Search from "./pages/Search"
import Navbar from "./components/Navbar"
import PublicProfile from "./pages/PublicProfile"
import EditProfile from "./pages/EditProfile"
import Footer from "./components/Footer"


function App(){

  return (

    <div className="min-h-screen flex flex-col">


      <Navbar/>


      <main className="flex-1">


        <Routes>


          <Route path="/" element={<Home/>}/>


          <Route path="/login" element={<Login/>}/>


          <Route path="/register" element={<Register/>}/>


          <Route path="/create" element={<CreateBlog/>}/>


          <Route path="/blog/:id" element={<BlogDetails/>}/>


          <Route path="/profile" element={<Profile/>}/>


          <Route path="/edit/:id" element={<EditBlog/>}/>


          <Route path="/search" element={<Search/>}/>


          <Route path="/profile/:id" element={<PublicProfile/>}/>


          <Route path="/edit-profile" element={<EditProfile/>}/>


        </Routes>


      </main>


      <Footer/>


    </div>

  )

}


export default App