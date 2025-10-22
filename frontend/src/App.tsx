import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import SignupPage from "./pages/Signup"
import VerifyEmail from "./pages/verify-email"
import SignInPage from "./pages/Signin"


function App() {
  return (
    <div className="">
      <Routes>
         <Route path="/" element={<HomePage/>} />
         <Route path="/signup" element={<SignupPage/>}/>
         <Route path="/signin" element={<SignInPage/>}/>
         <Route path="/verify-email" element={<VerifyEmail/>} />
      </Routes>
    </div>
  )
}

export default App