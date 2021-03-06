import React,{useEffect} from 'react'
import tw from "tailwind-styled-components"
import { useRouter } from 'next/router'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { auth, provider } from '../firebase'

const Login = () => {

  const router = useRouter()
  
  useEffect(()=>{
    onAuthStateChanged(auth, user=>{
      if(user){
        router.push('/')
      }
    })
  },[router])

  return (
    <Wrapper>
      <UberLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/220px-Uber_logo_2018.svg.png" />
      {/* <UberLogo src="https://i.ibb.co/ZMhy8ws/uber-logo.png"/> */}
      <Title>Login to access your account</Title>
      <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png"/>
      <SignInButton onClick={()=> signInWithPopup(auth,provider)}>
        SignIn with Google
      </SignInButton>      
    </Wrapper>
  )
}

export default Login

const Wrapper = tw.div`
flex flex-col h-screen w-screen bg-gray-200 p-4
`

const SignInButton = tw.button`
bg-black 
text-white 
text-center 
py-4 
mt-8 
self-center 
w-full
rounded-full
text-xl
`

const UberLogo = tw.img`
h-12
w-auto
object-contain
self-start

`
const Title = tw.div`
text-gray-500 
text-4xl
pt-4
`
const HeadImage = tw.img`
object-contain w-full
`
// DS&Algo
// https://youtu.be/jvEHSfzY99w