// Two different Working Approaches
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import Map from './components/Map'
import RideSelector from './components/RideSelector'
import Link from 'next/link'

const Confirm = () => {

    const router = useRouter()
    const {pickup, dropoff} = router.query

    const [pickupCoordinates,setPickupCoordinates] = useState([0,0]);
    const [dropoffCoordinates, setDropoffCoordinates] = useState([0,0]);

    class SearchCoordinates{
        constructor(name_of_place){
            this.name_of_place = name_of_place
        }
        async getLocation(){
            const newCoordinates = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.name_of_place}.json?`+ 
                new URLSearchParams({
                    access_token: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
                    limit: 1
                })
            )
            return await newCoordinates.json()
        }
    }

    // class SearchCoordinates{
    //     constructor(pickup,dropoff){
    //         this.pick = pickup
    //         this.drop = dropoff
    //     }
    //     getPickUpLoc(){
    //         fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.pick}.json?`+
    //             new URLSearchParams({
    //                 access_token: process.env.ACCESS_TOKEN,
    //                 limit: 1
    //             })
    //         )
    //         .then(res=>res.json())
    //         .then(data=>{
    //             setPickupCoordinates(data.features[0].center)
    //         })
    //     }
    //     getDropOffLoc(){
    //         fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.drop}.json?`+
    //             new URLSearchParams({
    //                 access_token: process.env.ACCESS_TOKEN,
    //                 limit: 1
    //             })
    //         )
    //         .then(res=>res.json())
    //         .then(data=>{
    //             setDropoffCoordinates(data.features[0].center)
    //         })
    //     }
    // }

    useEffect(()=>{
        const pickUpCoordinates = new SearchCoordinates(pickup)
        pickUpCoordinates.getLocation().then((data)=>(setPickupCoordinates(data.features[0].center)))
        
        const dropOffCoordinates = new SearchCoordinates(dropoff)
        dropOffCoordinates.getLocation().then((data)=>(setDropoffCoordinates(data.features[0].center)))
        // console.log(coordinates.getLocation().then(data=> {return data}));
    },[])

  return (
    <Wrapper>
        <ButtonContainer>
            <Link href="/search" passHref>
                <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
            </Link>
        </ButtonContainer>
        
        <Map
            pickupCoordinates={pickupCoordinates}
            dropoffCoordinates={dropoffCoordinates}
        />
        <RideContainer>
            <RideSelector 
                pickupCoordinates={pickupCoordinates} 
                dropoffCoordinates={dropoffCoordinates} 
            />
            <ConfirmButtonContainer>
                ConfirmX
            </ConfirmButtonContainer>
        </RideContainer>

    </Wrapper>
  )
}

export default Confirm

const Wrapper = tw.div`
flex 
h-screen 
flex-col
`
const BackButton = tw.img`
h-12 object-contain
`

const RideContainer = tw.div`
flex-1 
flex 
flex-col 
h-1/2
`

const ButtonContainer = tw.div`
rounded-full 
absolute 
top-1 
left-2 
z-10
bg-white
shadow-md
cursor-pointer
`

const ConfirmButtonContainer = tw.div`
bg-black 
text-white 
mx-4 
mb-4 
py-2 
text-center 
text-xl 
rounded-full
border-t-2
`



// import { useRouter } from 'next/router'
// import React, { useEffect, useState } from 'react'
// import tw from "tailwind-styled-components"
// import Map from './components/Map'

// const Confirm = () => {

//     const router = useRouter()
//     const {pickup, dropoff} = router.query

//     console.log("pickup => ",pickup);
//     console.log("dropoff => ",dropoff);

//     const [pickupCoordinates,setPickupCoordinates] = useState();
//     const [dropoffCoordinates, setDropoffCoordinates] = useState();

//     class SearchCoordinates{
//         constructor(coordinates){
//             this.location = coordinates
//         }
//         getlocation(){
            
//         }
//     }

//     const getPickupCoordinates = (pickupLoc)=>{
//         const pickup = pickupLoc
//         fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?`+
//             new URLSearchParams({
//                 access_token: process.env.ACCESS_TOKEN,
//                 limit: 1
//             })
//         )
//         .then(res=>res.json())
//         .then(data=>{
//             setPickupCoordinates(data.features[0].center)
//         })
//     }

//     const getDropoffCoordinates = (dropoffLoc)=>{
//         const dropoff = dropoffLoc;

//         fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?`+
//             new URLSearchParams({
//                 access_token: process.env.ACCESS_TOKEN,
//                 limit: 1
//             })
//         )
//         .then(res=>res.json())
//         .then(data=>{
//             setDropoffCoordinates(data.features[0].center)
//         })
//     }

//     useEffect(()=>{

//         getPickupCoordinates(pickup);
//         getDropoffCoordinates(dropoff);

//     },[pickup,dropoff])

//   return (
//     <Wrapper>
//         <Map 
//             pickupCoordinates={pickupCoordinates}
//             dropoffCoordinates={dropoffCoordinates}
//         />
//         <RideContainer>
//             Ride Selector confirm button
//         </RideContainer>
//     </Wrapper>
//   )
// }

// export default Confirm