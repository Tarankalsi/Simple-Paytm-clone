import { useState , useEffect} from 'react'
import Button from "./Button"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function Users() {

    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")
    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        }) .then (response => {
            setUsers(response.data.users)
        })
        
    }, [filter])
    
    const filterUser = (e)=>{
        setFilter(e.target.value)
    }
    
    return <>

        <div className='font-bold mt-6 text-lg'>
            Users
        </div>
        <input  onChange={filterUser} type="text" placeholder='Search users...' className=' w-full px-2 py-1 mb-4 mt-2 border rounded border-slate-200' />

        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>

    </>
}


function User({ user }) {
    const navigate = useNavigate()
    return (
        <div className='flex justify-between'>
            <div className='flex'>
                <div className='rounded-full bg-slate-200 h-11 w-11 flex justify-center mt-1 mr-2'>
                    <div className='flex flex-col justify-center h-full text-xl'>
                        {user.firstName[0].toUpperCase()}
                    </div>
                </div>
             
                <div className='flex flex-col justify-center h-full'>
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>


            <div className='flex flex-col justify-center h-full '>
                <div>
                    <Button onClick={(e)=>{
                        navigate(`/send?id=${user._id}&name=${user.firstName}`)
                    }} label={"Send Money"}/>
                </div>
            </div>
        </div>
    )
}
