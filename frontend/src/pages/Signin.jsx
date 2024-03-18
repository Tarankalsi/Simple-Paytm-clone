import { useEffect } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import { firstNameAtom, lastNameAtom, passwordAtom, usernameAtom } from '../../store/atoms/userAtom'
import { useNavigate } from 'react-router-dom'




function Signin() {

  const setFirstName = useSetRecoilState(firstNameAtom)
  const setLastName = useSetRecoilState(lastNameAtom)
  const [username, setUsername] = useRecoilState(usernameAtom)
  const [password, setPassword] = useRecoilState(passwordAtom)
  const navigate = useNavigate()

  const SigninCall = async () => {

    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
      username: username,
      password: password
    })

    localStorage.setItem("token",response.data.token)
    
    setFirstName(response.data.firstName)
    setLastName(response.data.lastName)
    setUsername(response.data.username)
    navigate("/dashboard")
  }

  return <>

    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-96 text-center p-2 h-max px-8'>
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"name@gmail.com"} onChange={(e) => {
            setUsername(e.target.value)
          }} />
          <InputBox label={"Password"} placeholder={"Your Password"} onChange={(e) => {
            setPassword(e.target.value)
          }} />
          <div className="pt-4">
            <Button label={"Sign In"} onClick={SigninCall} />
          </div>
          <BottomWarning label={"Create Account?"} ButtonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  </>




}

export default Signin
