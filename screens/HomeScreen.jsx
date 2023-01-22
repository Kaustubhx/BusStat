import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrgin } from '../slices/navSlices';
import NavFavourites from '../components/NavFavourites';


const HomeScreen = () => {

    const dispatch = useDispatch()

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100, height: 100, resizeMode: 'contain',
                    }}
                    source={{
                        uri: 'https://links.papareact.com/gzs'
                    }}
                />


                <GooglePlacesAutocomplete
                    placeholder='Where from?'
                    onPress={(data, details = null) => {
                        dispatch(
                            setOrgin({
                                location: details.geometry.location,
                                description: data.description,

                            }))

                        dispatch(setDestination(null))
                    }}
                    fetchDetails={true}
                    query={{
                        key: REACT_APP_GOOGLE_MAPS_API_KEY,
                        language: "en",
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    enablePoweredByContainer={false}
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        }
                    }}
                />

                <NavOptions />

                <NavFavourites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})