import React from 'react'

function InputBox({label , placeholder , onChange}) {
  return (
    <div className='py-1'>
      <div className='font-semibold text-l text-left py-2'>{label}</div>
      <input onChange={onChange}  type="text" placeholder={placeholder} className='w-full px-2 py-1 border rounded border-slate-200'/>
    </div>
  )
}

export default InputBox
