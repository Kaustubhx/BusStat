import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlices';
import MapViewDirections from 'react-native-maps-directions';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "@env";


const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();


    useEffect(() => {
        if (!origin || !destination) return;

        zoomOut = setTimeout(() => {
            mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
                edgePadding: {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50,
                },
                animated: true
            })
        }, 500)

    }, [origin, destination])


    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?origins=Seattle&destinations=San+Francisco&key=AIzaSyBYzyaruNy9FbkEKOrDbnQwelZ1DWdXIns`
            ).then((res) => res.json())
                .then(data => {
                    // dispatch(setTravelTimeInformation(data))
                    console.log(data)
                    console.log(data.rows[0].elements[0])
                    // console.log(origin.description)
                    // console.log(destination.description)
                })
        };

        getTravelTime();
    }, [origin, destination, REACT_APP_GOOGLE_MAPS_API_KEY])


    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={REACT_APP_GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title='Origin'
                    description={origin.description}
                    identifier={"origin"}
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title='Destination'
                    description={destination.description}
                    identifier={"destination"}
                />
            )}
        </MapView>
    )
}

Map.propTypes = {
    provider: ProviderPropType,
};

export default Map
