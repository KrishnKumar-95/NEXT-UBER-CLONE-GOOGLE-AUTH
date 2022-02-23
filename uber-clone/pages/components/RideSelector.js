import React,{useEffect, useState} from 'react'
import tw from "tailwind-styled-components"
import {carList} from '../../data/carList'

const RideSelector = ({pickupCoordinates,dropoffCoordinates}) => {
   // get ride duration from mapbox api
  const [rideDuration,setRideDuration] = useState()

  // this gives us the duration of
  useEffect(()=>{
      async function fetchApi(){
        const getData = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?`+
            new URLSearchParams({
                access_token: process.env.NEXT_PUBLIC_ACCESS_TOKEN
            })
        )
        return await getData.json()
      }

      fetchApi().then(data=>{
          setRideDuration((data.routes[0]?.duration)/100)
      })
  },[pickupCoordinates,dropoffCoordinates])

  return (
    <Wrapper>
        <Title>Choose a ride, or swipe up for more</Title>
        <CarList>
            {carList.map((car,index)=>(
                <Car key={index}>
                    <CarImage src={car.imgUrl}/>

                    <CarDetails>
                        <Service>{car.service}</Service>
                        <Time>5 min away</Time>
                    </CarDetails>

                    <Price>{'₹'+(rideDuration * car.multiplier).toFixed(2)}</Price>
                </Car>
            ))}
        </CarList>
    </Wrapper>
  )
}

export default RideSelector

const Wrapper = tw.div`
flex-1 
overflow-y-scroll 
flex 
flex-col
`

const Title = tw.div`
text-center 
text-gray-500 
text-xs 
py-2 
border-b
`

const CarList = tw.div`
overflow-y
`

const Car = tw.div`
flex 
p-4 
item-center
`

const CarImage = tw.img`
h-14 
mr-4
`

const CarDetails = tw.div`
flex-1
`
const Service = tw.div`
font-medium
`
const Time = tw.div`
text-xs 
text-blue-500
`
const Price = tw.div`
text-sm
`