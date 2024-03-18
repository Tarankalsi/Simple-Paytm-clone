import { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { passwordAtom, firstNameAtom, lastNameAtom, usernameAtom } from '../../store/atoms/userAtom'



function Signup() {
  const [firstName, setFirstName] = useRecoilState(firstNameAtom)
  const [lastName, setLastName] = useState(lastNameAtom)
  const [username, setUsername] = useState(usernameAtom)
  const [password, setPassword] = useState(passwordAtom)
  const navigate = useNavigate()

  const signupCall = async () => {
    await axios.post("http://localhost:3000/api/v1/user/signup", {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password
    })

    navigate("/signin")
  }

  return <>
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-96 text-center p-2 h-max px-8'>
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information To create an account"} />
          <InputBox label={"First Name"} placeholder={"John"} onChange={e => {
            setFirstName(e.target.value)
          }} />
          <InputBox label={"Last Name"} placeholder={"Doe"} onChange={e => {
            setLastName(e.target.value)
          }} />
          <InputBox label={"Email"} placeholder={"name@gmail.com"} onChange={e => {
            setUsername(e.target.value)
          }} />
          <InputBox label={"Password"} placeholder={"Your Password"} onChange={e => {
            setPassword(e.target.value)
          }} />
          <div className="pt-4">
            <Button label={"Sign up"} onClick={signupCall} />
          </div>
          <BottomWarning label={"Already have an account?"} ButtonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  </>
}

export default Signup
