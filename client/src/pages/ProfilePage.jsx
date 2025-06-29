import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {

const {authUser, updateProfile}= useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e) => {
    e.preventDefault();
if (!selectedImg) {
  await updateProfile({ fullName: name, bio });
  navigate('/');
  return;
}

const reader = new FileReader();
reader.readAsDataURL(selectedImg);
reader.onload = async () => {
  const base64Image = reader.result;
  await updateProfile({ profilePic: base64Image, fullName: name, bio });
  navigate('/');
}
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0e0e2c] to-[#1c1c3c] flex items-center justify-center p-4'>
      <div className='w-full max-w-3xl flex max-md:flex-col-reverse items-center justify-between rounded-xl backdrop-blur-lg border border-gray-700 bg-white/5 shadow-xl'>
        
        {/* Left Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 flex-1 text-white">
          <h3 className="text-xl font-semibold text-white">Profile details</h3>

          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input 
              onChange={(e) => setSelectedImg(e.target.files[0])} 
              type="file"
              id='avatar' 
              accept='.png, .jpg, .jpeg' 
              hidden 
            />
            <img 
              src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
              alt="Profile"
              className={`w-12 h-12 object-cover ${selectedImg && 'rounded-full'}`} 
            />
            <span className='text-sm'>Upload profile image</span>
          </label>

          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name}
            type="text" 
            required 
            placeholder='Your name' 
            className='p-3 bg-transparent text-white border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
          />

          <textarea 
            onChange={(e) => setBio(e.target.value)} 
            value={bio}
            placeholder="Write profile bio" 
            required 
            className="p-3 bg-transparent text-white border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" 
            rows={4}
          ></textarea>

          <button 
            type="submit" 
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 transition-all duration-200 text-white py-2 rounded-full text-lg font-medium shadow-lg"
          >
            Save
          </button>
        </form>

        {/* Right Logo Icon */}
        <div className="flex-1 flex justify-center p-6">
  <img 
    className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`} 
    src={authUser?.profilePic || assets.logo_icon} 
    alt="Logo" 
  />
</div>

      </div>
    </div>
  )
}

export default ProfilePage
