import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import {Button} from '../components/button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    title: string;
    subTitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😉'
}

export function Confirmation(){
    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subTitle,
        buttonTitle,
        icon,
        nextScreen

    } = routes.params as Params;

    function handleMoveOn(){
        navigation.navigate(nextScreen);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={styles.title} >
                    {title}
                </Text>
                <Text style={styles.subtitle} >
                    {subTitle}
                </Text>

                <View style={styles.footer} >
                    <Button 
                        title={buttonTitle}
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