import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';
import tw from 'twrnc';

const data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "Kharegaon, Kalwa, Thane"
    },
    {
        id: "456",
        icon: "people-outline",
        location: "College",
        destination: "VPM'S RZ Saha College , Mithagar Road, Mulund"
    },
];

const NavFavourites = () => {

    return (
        <FlatList

            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
            )}
            renderItem={({ item: { location, destination, icon } }) => (
                <TouchableOpacity style={tw`flex-row items-center p-5`}>
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>{location}</Text>
                        <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavFavourites

const styles = StyleSheet.create({})