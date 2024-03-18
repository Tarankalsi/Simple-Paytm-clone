import { useState, useEffect } from 'react'
import AppBar from '../components/AppBar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios'

import { useRecoilState, useRecoilValue } from 'recoil'
import { balanceAtom } from '../../store/atoms/userAtom'


function Dashboard() {

  const [balance, setBalance] = useRecoilState(balanceAtom)

  useEffect(() => {
    try {
     axios.post("http://localhost:3000/api/v1/account/balance", {}, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }).then((response) => {
        setBalance(response.data.balance)
      })
    } catch (error) {
      console.log("Error fetching Balance" + error)
      throw error
    }
  }, [balance])




  return (
    <div className='mx-10'>
      <AppBar />
      <Balance amount={balance.toFixed(2)} />
      <Users />
    </div>
  )
}

export default Dashboard
