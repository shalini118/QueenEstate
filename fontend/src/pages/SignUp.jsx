import { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function SignUp() {
    const defaultData = {
        fullName:'',
        userName:'',
        email:'',
        password:'',
        confirmPassword:''
    }
    const [formData,setFormData] = useState(defaultData)
    const [error,setError] =useState(null)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        setFormData(defaultData)
    },[])

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true);
        try{

            const res = await fetch('http://localhost:5000/user/signup',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json()
            if(data.error === true){
                setError(data.message)
                setLoading(false)
                return;
            }
            toast.success(data.message)
        }
        catch(err){
            console.log(err)
            setError(err.message)
            setLoading(false)
            return;
        }
        setLoading(false);
        setError(null)

        navigate('/sign-in')
        

    }

  return (
    <div className='max-w-lg mx-auto p-3'>
        <h1 className='font-semibold text-3xl my-7 text-center'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="text" placeholder='fullname' onChange={handleChange} value={formData.fullName} id='fullName' className='bg-slate-200 rounded-lg p-2 border'/>
            <input type="text" placeholder='username' onChange={handleChange} value={formData.userName} id='userName' className='bg-slate-200 rounded-lg p-2 border'/>
            <input type="email" placeholder='email' onChange={handleChange} value={formData.email} id='email' className='bg-slate-200 rounded-lg p-2 border' />
            <input type="password" placeholder='password' onChange={handleChange} value={formData.password} id='password' className='bg-slate-200 rounded-lg p-2 border'/>
            <input type="password" placeholder='confirm Password' onChange={handleChange} value={formData.confirmPassword} id='confirmPassword' className='bg-slate-200 rounded-lg p-2 border'/>
            <button disabled={loading} className='bg-slate-700 p-2 text-white font-semibold rounded-lg'>
                {loading? 'Loading...' : 'SIGN UP'}
            </button>
        </form>
        <div className='flex mt-2 gap-2'>
            <p>Have an account?</p>
            <Link to='/sign-in'>
                <span className='text-blue-700 font-semibold'>Sign In</span>
            </Link>
        </div>
        {error? <p className='text-blue-700 pt-3 truncate'>Error: {error}</p> : "" }
    </div>
  )
}

export default SignUp