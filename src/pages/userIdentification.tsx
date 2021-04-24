import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Dimensions,
    View,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import {Fontisto} from '@expo/vector-icons';

import { Button } from '../components/button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function UserIdentification(){
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setisFilled] = useState(false);
    const [name, setName] = useState<string>();
    const navigation = useNavigation();

    function handleInputBlur(){
        setIsFocused(false);
        setisFilled(!!name);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value: string){
        setisFilled(!!value);
        setName(value);
    }


    function handleSubmit(){
        navigation.navigate('confirmation');
    }

    return (
        <SafeAreaView style={styles.container} >
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.content} >
                    <View style={styles.form} >
                        <Text style={styles.emoji}>
                            <Fontisto name="smiley" size={40} color={colors.green_dark} />
                        </Text>

                        <Text style={styles.title} >
                            Como podemos {'\n'}
                            chamar você?
                        </Text>

                        <TextInput
                            style={[
                                styles.input,
                                (isFocused || isFilled) && 
                                {borderColor: colors.green}
                            ]}
                            placeholder="Digite seu nome"
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />
                        <View style={styles.footer}>
                            < Button
                                title="Confirmar"
                                onPress={handleSubmit}
                            />
                        </View>
                        
                    </View>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    emoji: {
        fontSize: 44,
        marginBottom: 24,
    },
    title: {
        height: 64,
        fontSize: 24,
        fontFamily: fonts.heading,
        textAlign: 'center',
        lineHeight: 32,
        color: colors.heading
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        marginTop: 40,
        width: 231,

    }
})