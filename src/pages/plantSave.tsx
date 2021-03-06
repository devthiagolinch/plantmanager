import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity
} from 'react-native';
import { color } from 'react-native-reanimated';
import {SvgFromUri} from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {useNavigation, useRoute} from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';

import waterDrop from '../assets/waterdrop.png';
import { Button } from '../components/button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface Params {
    plant: PlantProps
}

export function PlantSave(){
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const route = useRoute();
    const {plant} = route.params as Params;

    const navigation = useNavigation();

    function handleChangeTime(event: Event, dateTime: Date | undefined ){
        if(Platform.OS = 'android'){
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma data futura. ⏰');
        }

        if(dateTime){
            setSelectedDateTime(dateTime);
        }

    }

    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSavePlant(){

        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('confirmation', {
                title: 'Tudo certo',
                subTitle: ' Fique tranquilo que sempre vamos \n lembrar você de cuidar da sua plantinha \n com bastante amor.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'myPlant'
            });


        }catch{
            Alert.alert('Nao foi possivel salvar a planta.');
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container} >
            <View style={styles.plantInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150} />

                <Text style={styles.plantName}>
                    {plant.name}
                </Text>

                <Text style={styles.aboutPlant}>
                    {plant.about}
                </Text>
            </View>

            <View style={styles.controlers}>
                <View style={styles.tipContainer}>
                    <Image 
                    source={waterDrop}
                    style={styles.tipImage}
                    />

                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>

                <Text style={styles.alertLabel} >
                    Escolha o melhor horario para ser lembrado.
                </Text>

               {showDatePicker && (
                    <DateTimePicker 
                        value={selectedDateTime}
                        mode='time'
                        display='spinner'
                        onChange={handleChangeTime}
                    />
                )}

                {
                    Platform.OS === 'android' && (
                        <TouchableOpacity
                            onPress={handleOpenDateTimePickerForAndroid}
                            style={styles.dateTimePickerButton}
                        >
                            <Text style={styles.dateTimePickerText}>
                                {`Seu horario ${format(selectedDateTime, 'HH:mm')}`}
                            </Text>
                        </TouchableOpacity>
                        
                    )
                }

                <Button 
                        title="Cadastrar Planta"
                        onPress={handleSavePlant}
                    />
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,

    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    plantName: {
        textAlign: 'center',
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 24,
        marginTop: 15
    },
    aboutPlant: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    controlers: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,

    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complements,
        color: colors.heading,
        fontSize: 15,
        marginBottom: 5
    },
    dateTimePickerButton: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    dateTimePickerText: {
        textAlign: 'center',
        fontFamily: fonts.complements,
        fontSize: 17,
        color: colors.green_dark
    },
})