import React,{useEffect} from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

export const Map = ({pickupCoordinates, dropoffCoordinates}) => {

  const addToMap = (map,coordinates)=>{
    new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
      center: [77.267387, 30.129047],
      zoom: 10
    });
    if(pickupCoordinates){
      addToMap(map, pickupCoordinates)
    }
    if(dropoffCoordinates){
      addToMap(map, dropoffCoordinates)
    }

    // To Zoom into the Map when the new coordinates are applied
    if(pickupCoordinates && dropoffCoordinates){
      map.fitBounds([
        pickupCoordinates,
        dropoffCoordinates
      ],{
        // this gives padding in the map so that both markers will show properly
        padding: 30
      })
    }

  },[pickupCoordinates,dropoffCoordinates]);

  return (
    <Wrapper id='map'></Wrapper>
  )
}

const Wrapper = tw.div`
flex-1 h-1/2
`

export default Map;