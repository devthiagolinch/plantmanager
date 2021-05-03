import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import {Button} from '../components/button'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { FontAwesome5 } from '@expo/vector-icons';


export function Confirmation(){
    const navigation = useNavigation();

    function handleMoveOn(){
        navigation.navigate('plantSelect');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😎
                </Text>
                <Text style={styles.title} >
                    Tudo Certo
                </Text>
                <Text style={styles.subtitle} >
                Fique tranquilo que sempre vamos {'\n'}
                lembrar você de cuidar da sua plantinha {'\n'}
                com bastante amor.
                </Text>

                <View style={styles.footer} >
                    <Button 
                        title="Muito obrigado"
                        onPress={handleMoveOn}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    emoji: {
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 64
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        textAlign: 'center',
        color: colors.heading,
        marginBottom: 16
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 25,
        textAlign: 'center',
        color: colors.heading
    },
    footer: {
        width: 231,
        marginTop: 40,
    },
})