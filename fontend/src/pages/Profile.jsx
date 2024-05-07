import {useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {signOutSuccess} from '../redux/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import SelfListing from '../components/SelfListing'
import { toast } from 'react-toastify'
function Profile() {
    const {currentUser} = useSelector(state => state.user)
    const currentUserId=currentUser._id
    const [list,setList] = useState([])

    useEffect(()=>{
        const start = async() =>{
            const res = await fetch(`http://localhost:5000/user/getUser/${currentUserId}`)
            const data = await res.json()
            setList(data.listingList)
        }
        start()
    },[])

    
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const signOut = async() =>{
        try{

            await fetch('http://localhost:5000/user/signout',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            dispatch(signOutSuccess())
            toast.info("Sign out successfull")
            navigate('/')
        } 
        catch(err){
            console.log("Error on signout",err)
        }
    }

    const deleteAccount = async() =>{
        try{
            await fetch(`http://localhost:5000/user/deleteUser/${currentUserId}`,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            dispatch(signOutSuccess())
            toast.info("Account deleted")
            navigate('/')
        }
        catch(err){
            console.log("Error on delete account",err)
        }
    }

  return (
    <div className='max-w-lg mx-auto flex flex-col gap-3'>
        <h1 className='text-3xl my-8 font-semibold mx-auto'>Profile</h1>
        <img  src="https://cdn-icons-png.flaticon.com/512/149/149071.png" className='h-24 w-24 text-center rounded-full object-cover self-center' /> 
        <form className='mt-6 flex flex-col gap-3  mx-auto w-3/4'>
            <input type="text" placeholder="Fullname" defaultValue={currentUser? currentUser.fullName: null} id="" className='p-2 rounded-lg '/>
            <input type="text" placeholder="Email" defaultValue={currentUser? currentUser.email: null} id="" className='p-2 rounded-lg '/>
            <input type="text" placeholder="Password" id="" className='p-2 rounded-lg '/>
            <button type="submit" className='p-2 bg-slate-700 rounded-lg  text-white font-semibold'>UPDATE</button>
        </form>
        <Link to='/create-listing'>
            <p className='bg-green-700 w-3/4 p-2 text-center text-white font-semibold rounded-lg mt-3 mx-auto'>CREATE LISTING</p>
        </Link>        
        <div className='flex mt-3  text-red-700 text-sm mx-auto gap-5'>
            <p onClick={deleteAccount} className='cursor-pointer'>Delete Account</p>
            <p>||</p>
            <span onClick={signOut} className='cursor-pointer'>Sign out</span>
        </div>
        {
            list.map((listing)=>(
                <SelfListing key={listing._id} listing={listing}/>
            ))
        }

        {/* <SelfListing/> */}
        
    </div>
  )
}

export default Profile