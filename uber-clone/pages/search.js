import React,{useState} from 'react';
import tw from "tailwind-styled-components";
import Link from 'next/link'

export const Search = () => {

  const [pickup,setPickUp] = useState("");
  const [dropoff, setDropOff] = useState("");

  return (
    <Wrapper>
      {/* Button Container */}
      <ButtonContainer>
        <Link href="/" passHref>
            <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
        <Link href="/confirm" passHref>
            <BackButton src="https://img.icons8.com/ios-filled/50/000000/right.png" />
        </Link>
      </ButtonContainer>
      {/* Input Container */}
      <InputContainer>
        <FromToIcons>
            <Circle src="https://img.icons8.com/ios/50/9CA3AF/filled-circle.png"/>
            <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png"/>
            <Square src="https://img.icons8.com/ios/50/9CA3AF/square.png"/>
        </FromToIcons>
      <InputBoxes>
        <Input 
          placeholder="Enter pickup location..." 
          value={pickup}
          onChange={(e)=>{setPickUp(e.target.value)}}/>
        <Input 
          placeholder="Where to?" 
          value={dropoff}
          onChange={(e)=>{setDropOff(e.target.value)}}/>
      </InputBoxes>
      <PlusIcon src="https://img.icons8.com/ios-filled/50/000000/plus-math.png" />
      </InputContainer>
      {/* Saved Places */}
      <SavedPlaces>
        <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
        Saved Places
      </SavedPlaces>
      {/* Confirm Location */}

      {/* We can pass arguments in the link tag which can be found in search bar after natigating to next page */}
      <Link href={{
        pathname:'/confirm',
        query:{ 
          pickup: pickup, 
          dropoff: dropoff
        }
      }} passHref>

        <ConfirmLocation>
          Confirm Locations
        </ConfirmLocation>
      </Link>
    </Wrapper>
  )
}

export default Search

const Wrapper = tw.div`
bg-gray-200 
h-screen 
`
const ButtonContainer = tw.div`
bg-white 
px-4
flex
justify-between
`
const BackButton = tw.img`
h-12 
cursor-pointer
`
const InputContainer = tw.div`
bg-white 
flex 
items-center 
px-4 
mb-2
`
const FromToIcons = tw.div`
w-10 
flex 
flex-col
mr-2
items-center
`
const Circle = tw.img`
h-3 
bg-gray-400 
rounded-full
`
const Line = tw.img`
h-10
`
const Square = tw.img`
h-3 
bg-black
`

const InputBoxes = tw.div`
flex 
flex-col
flex-1
mb-2
`

const Input = tw.input`
h-10
bg-gray-200
my-2
rounded-2
p-2
outline-none
border-none
`

const PlusIcon = tw.img`
w-10 
h-10 
bg-gray-200 
rounded-full 
ml-3
`

const SavedPlaces = tw.div`
flex 
items-center 
bg-white 
px-4 
py-2
`

const StarIcon = tw.img`
bg-gray-400 
w-10 
h-10 
p-2 
rounded-full 
mr-2
`

const ConfirmLocation = tw.div`
bg-black 
text-white 
text-center 
mx-2 
text-2xl 
py-2 
mt-3 
cursor-pointer 
rounded-full
`