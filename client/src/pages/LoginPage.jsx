import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

function LoginPage() {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const {login} = useContext(AuthContext)



  const onSubmitHandler = (event) => {
  event.preventDefault();

  if (currState === 'Sign up' && !isDataSubmitted) {
    setIsDataSubmitted(true)
    return;
  }

login(currState === "Sign up" ? "signup" : "login", { fullName, email, password, bio });

}

  return (
    <div className='min-h-screen bg-black bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col'>

      {/* ---------- left side ---------- */}
      <img src={assets.logo_big} alt="QuickChat Logo" className='w-[min(30vw,250px)]' />

      {/* ---------- right side form ---------- */}
      <form onSubmit={onSubmitHandler} className='w-[min(90vw,320px)] bg-white/10 text-white p-6 flex flex-col gap-5 rounded-xl backdrop-blur-md border border-white/20 shadow-xl'>

        <h2 className='text-xl font-semibold mb-1 flex justify-between items-center'>
          {currState}
          {isDataSubmitted && 
          <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="Switch" className='w-5 cursor-pointer' />
}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className='p-2 bg-transparent border border-gray-600 rounded-md placeholder-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className='p-2 bg-transparent border border-gray-600 rounded-md placeholder-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className='p-2 bg-transparent border border-gray-600 rounded-md placeholder-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
              required
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Provide a short bio..."
            className='p-2 bg-transparent border border-gray-600 rounded-md placeholder-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500'
            required
          ></textarea>
        )}

        <button
          type='submit'
          className='py-2.5 mt-1 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-md text-sm font-semibold hover:opacity-90 transition-all'
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className='flex items-center gap-2 text-xs text-white/70'>
          <input type="checkbox" className='accent-purple-600' />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>


<div className='flex flex-col gap-2'>
  {currState === "Sign up" ? (
    <p className='text-sm text-gray-600'>Already have an account? <span onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}}
    className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
  ) : (
    <p className='text-sm text-gray-600'>Create an account <span onClick={()=> setCurrState("Sign up")}
    className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
  )}
</div>


      </form>
    </div>
  )
}

export default LoginPage
