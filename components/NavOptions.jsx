import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlices';

const NavOptions = () => {

    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);


    const data = [
        {
            id: 1,
            title: 'Get a ride',
            image: 'https://links.papareact.com/3pn',
            screen: 'MapScreen',
        },
        {
            id: 2,
            title: 'Order a food',
            image: 'https://links.papareact.com/28w',
            screen: 'EatsScreen',
        }


    ]


    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.screen)}
                    style={tw`p-2 pl-6 pb-8 bg-gray-200 m-2`}>
                    <View style={tw`${!origin && 'opacity-20'}`}>
                        <Image
                            style={{
                                height: 120,
                                width: 120,
                                resizeMode: 'contain',
                            }}
                            source={{ uri: item.image }}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon
                            style={tw`p-2 bg-black rounded-full w-10`}
                            name='arrowright'
                            color='white'
                            type='antdesign'
                        />
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavOptions

const styles = StyleSheet.create({})