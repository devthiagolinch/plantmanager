import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';

import {Button} from '../components/button'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { FontAwesome5 } from '@expo/vector-icons';

export function Confirmation(){
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                <FontAwesome5 name="smile-wink" size={90} color={colors.green_dark} />
                </Text>
                <Text style={styles.title} >
                    Prontinho
                </Text>
                <Text style={styles.subtitle} >
                Agora vamos começar a cuidar das suas {'\n'}
                plantinhas com muito cuidado.
                </Text>

                <View style={styles.footer} >
                    <Button 
                        title="Começar"
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