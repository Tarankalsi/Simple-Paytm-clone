import React from 'react'
import { useRecoilValue } from 'recoil'
import { firstNameAtom } from '../../store/atoms/userAtom'
import { useNavigate } from 'react-router-dom'

export default function AppBar() {

    const navigate = useNavigate();

    const firstName = useRecoilValue(firstNameAtom)
    console.log(firstName)

    return (
        <div className='flex justify-between shadow h-14'>
            <div className='flex flex-col justify-center h-full mr-4'>
                PayTM App
            </div>
            <div className='flex'>
                <div className='flex flex-col justify-center h-full mr-4'>
                    {firstName}
                </div>
                <div className='bg-slate-200 h-12 w-12 flex justify-center rounded-full mt-1 mr-2'>
                    <div className='flex flex-col justify-center h-full text-xl'>
                        U
                    </div>
                    
                </div>
                <button onClick={()=>{
                    localStorage.removeItem("token")
                    navigate("/signin")
                }}
                type="button" className="text-[#24292F]  bg-white hover:text-white hover:bg-slate-700 flex flex-col justify-center my-2 px-3 rounded text-sm font-semibold">
                        Logout
                    </button>
            </div>
        </div>
    )
}
