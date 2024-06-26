import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {signInStart,signInFailure, signInSuccess} from '../redux/user/userSlice'
import { toast } from 'react-toastify'

function SignIn() {
  const [formData,setFormData] = useState({})
  const {loading,error} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
const handleClick = async(e)=>{
    e.preventDefault()
    if(!formData.email || !formData.password){
      dispatch(signInFailure("Please fill all the fields"))
      return;
    }
    try {
      dispatch(signInStart())

    const res = await fetch('http://localhost:5000/user/signin',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })

    const data = await res.json()
    if(res.status !== 200){
      dispatch(signInFailure(data.message))
      return;
    }
    dispatch(signInSuccess(data?.data))
    toast.success("Sign In Successfull!!")
    navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className=' max-w-lg mx-auto p-3'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Sign In</h1>
        <form onSubmit={handleClick} className='flex flex-col gap-3'>
            <input type="email" onChange={handleChange} id='email' placeholder='email' className='bg-slate-200 p-2 rounded-lg border' />
            <input type="password" onChange={handleChange} id='password'  placeholder='password' className='bg-slate-200 p-2 rounded-lg border'/>
            <button disabled={loading}  className='bg-slate-700 p-2 rounded-lg border font-semibold text-white'>
              {loading? "Loading..." : "SIGN IN"}
            </button>
        </form>
        <div className='flex gap-2 mt-3'>
            <p> {"Don't have an account?"}</p>
            <Link to='/sign-up'>
                <span className='text-blue-700 font-semibold'>Sign Up</span>
            </Link>
        </div>
        {error? <p className='text-blue-700 pt-3 truncate'>Error: {error}</p> : ""}
    </div>
  )
}

export default SignIn