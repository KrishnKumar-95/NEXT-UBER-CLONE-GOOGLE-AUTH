import { useEffect,useState } from 'react';
import tw from "tailwind-styled-components"
import Map from './components/Map'
import Link from 'next/link'
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Home() {

  const [user, setUser] = useState(null);
  const router = useRouter()
  useEffect(()=>{
    return onAuthStateChanged(auth, user=>{
      if(user){
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL
        })
      }else{
        setUser(null)
        router.push('/')
      }
    })
  },[router])

  return (
    <Wrapper>
      <Map />
      <ActionItems>
        {/* Header */}
        <Header>
          <UberLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/220px-Uber_logo_2018.svg.png" />
          <Profile>
            <Name>{user && user.name}</Name>
            <UserImage src={user && user.photoUrl} onClick={()=> signOut(auth)} />
          </Profile>
        </Header>
        {/* ActionButtons */}
        <ActionButtons>
          <Link href="/search" passHref>
            <ActionButton>
                <ActionButtonImg src="https://i.ibb.co/cyvcpfF/uberx.png"/>
                Ride
            </ActionButton>
          </Link>
            <ActionButton>
                <ActionButtonImg src="https://i.ibb.co/n776JLm/bike.png"/>
                2 Wheels
            </ActionButton>
            <ActionButton>
                <ActionButtonImg src="https://i.ibb.co/5RjchBg/uberschedule.png"/>
                Reserve
            </ActionButton>
        </ActionButtons>
        {/* InputField */}
        <InputButton>Where to go?</InputButton>
      </ActionItems>
    </Wrapper>
  )
}

const Wrapper = tw.div`
flex 
flex-col 
h-screen
`
const ActionItems = tw.div`
flex-1 
p-3
`
const Header = tw.div`
flex 
justify-between 
items-center
mt-2.5
`
const UberLogo = tw.img`
h-12
`
const Profile = tw.div`
flex 
items-center
`
const Name = tw.div`
mr-2 
w-21 
text-sm
`
const UserImage = tw.img`
h-12 
w-12 
rounded-full 
border 
border-gray-200 
p-px
cursor-pointer
`
const ActionButtons = tw.div`
flex mt-4
`
const ActionButton = tw.div`
flex 
flex-col 
justify-center 
rounded-lg 
bg-gray-200 
flex-1 
text-center 
m-1 
h-32 
items-center 
transform 
hover:scale-105 
transition
text-xl
`
const ActionButtonImg = tw.img`
h-3/5
`
const InputButton = tw.div`
h-20 bg-gray-200 text-2xl flex p-4 items-center mt-8
`