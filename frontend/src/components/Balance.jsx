import React from 'react'

export default function Balance({amount}) {
  return (
    <div className='flex  font-semibold text-md my-3 mx-6'>
      <div className='font-bold text-lg'>Your Balance</div>
      <div className='font-semibold ml-4 text-lg'>Rs {amount}</div>
    </div>
  )
}
