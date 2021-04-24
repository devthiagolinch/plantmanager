import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import {Entypo} from '@expo/vector-icons';

import wateringIMG from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Welcome(){

    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('userIdentification');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.tittle}>
            Gerencie {'\n'}
            suas plantas {'\n'}
            de forma fácil
            </Text>

            <Image 
                source={wateringIMG}
                style={styles.image}
                resizeMode="contain"

            />

            <Text style={styles.subtittle}>
            Não esqueça mais de regar suas {'\n'}
            plantas. Nós cuidamos de lembrar você {'\n'}
            sempre que precisar.
            </Text>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.50} 
                onPress={handleStart}    
            >
                <Entypo
                    name="chevron-thin-right"
                    size={25}
                    color="white"
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    tittle: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: fonts.heading,
        marginTop: 80,
        textAlign: 'center',
        width: 222,
        height: 114,
        color: colors.heading,
    },
    subtittle: {
        fontSize: 17,
        fontFamily: fonts.text,
        color: colors.heading,
        width: 288,
        height: 75,
        textAlign: 'center'
    },
    image: {
        height: Dimensions.get('window').width * 0.7

    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        width: 56,
        height: 56,
        marginBottom: 56,
    },
});