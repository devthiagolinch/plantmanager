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
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    // Adicionou o "async" para liberar o "await" e esperar o name ser salvo de fato.
    async function handleSubmit(){

        // Validação de presença do nome do Usuário,
        // Se não tiver nome return uma mensagem.
        if(!name) return Alert.alert('Me diga seu nome 😢');

        // Async Storage: para salvar dados dentro do dispositivo do User
        // Adiciona o "await" para garantir que quando chegar no salvamento ele vai aguardar o dado ser salvo
        // e depois libera para continuar. Pois o AsyncStorage demora um pouco para salvar.
       try{
        await AsyncStorage.setItem('@plantmanager:user', name);
        navigation.navigate('confirmation', {
            title: 'Prontinho',
            subTitle: ' Agora vamos começar a cuidar das suas \n plantinhas com muito cuidado.',
            buttonTitle: 'Começar',
            icon: 'smile',
            nextScreen: 'plantSelect'
        });
       }catch{
           Alert.alert('Não foi possivel salvar seu nome. 😭')
       }
        
    }

    return (
        <SafeAreaView style={styles.container} >
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.content} >
                    <View style={styles.form} >
                        <Text style={styles.emoji}>
                            😃
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