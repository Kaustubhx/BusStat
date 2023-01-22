import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlices';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from '@rneui/base';

const NavigateCard = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center pb-5 text-xl`}>Good Morning User</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder='Where to?'
                        styles={toInputBoxStyles}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        minLength={2}
                        enablePoweredByContainer={false}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description,
                                }))
                            navigation.navigate('RideOptionsCard');
                        }}
                        query={{
                            key: REACT_APP_GOOGLE_MAPS_API_KEY,
                            language: "en",
                        }}
                        debounce={400}
                    />
                </View>

                <NavFavourites />

            </View>

            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("RideOptionsCard")}
                    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon
                        name='car'
                        type='font-awesome'
                        color="white"
                        size={16}
                    />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row justify-between bg-gray-200 w-24 px-4 py-3 rounded-full`}>
                    <Icon
                        name='fast-food-outline'
                        type='ionicon'
                        color="black"
                        size={16}
                    />
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})
