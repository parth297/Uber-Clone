import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'
import { Image } from 'react-native-elements/dist/image/Image'
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../../slices/navSlice';

const data =[
    {
        id: "Uber-X",
        title:"UberX",
        multiplier:1,
        image: "https://links.papareact.com/3pn"
    },
    {
        id: "Uber-XL",
        title:"Uber XL",
        multiplier:1.2,
        image: "https://links.papareact.com/5w8"
    },
    {
        id: "Uber-LUX",
        title:"Uber LUX",
        multiplier:1.75,
        image: "https://links.papareact.com/7pf"
    },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const setTravelTimeInformation = useSelector(selectTravelTimeInformation);
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
        <View>
        <TouchableOpacity 
         onPress={() => navigation.navigate("NavigateCard")}
         style={tw`absolute top-1 z-50 left-5 rounded-full`}
         >
        <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
            <Text style={tw`text-center text-xl`}>Select a Ride - {setTravelTimeInformation?.distance?.text}</Text>
        </View>
        <FlatList data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item:{id, title, multiplier, image}, item}) => (
            <TouchableOpacity
            onPress={() => {setSelected(item)}} 
            style={tw`flex-row justify-between items-center px-10 ${
                id === selected?.id && 'bg-gray-200'
                }`}>
                <Image 
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain"
                }}
                source={{uri: image}} />
                <View style={tw`-ml-6`}>
                    <Text style={tw`text-xl font-semibold`}>{title}</Text>
                    <Text>{setTravelTimeInformation?.duration?.text} Travel Time</Text>
                </View>
                <Text style={tw`text-xl`}>
                    {new Intl.NumberFormat('en-gb',{
                        style: 'currency',
                        currency: 'GBP'
                    }).format(
                        (setTravelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
                    )}
                </Text>
            </TouchableOpacity>
        )}
         />
         <View style={tw`mt-auto border-t border-gray-200`}>
            <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 ${!selected && `bg-gray-300`}`}>
                <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
            </TouchableOpacity>
         </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
