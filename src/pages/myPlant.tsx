import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList, 
    Alert
} from 'react-native';
import { Header } from '../components/header';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import waterDrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { PlantCardSecondary } from '../components/plantCardSecondary';
import { Load } from '../components/load';

export function MyPlant() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWatered] = useState<string>();

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`,[
            {
                text: 'Nao',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {

                        await removePlant(plant.id);
                        setMyPlants((oldData) => (
                        oldData.filter((item) => item.id !== plant.id)
                        ));

                    } catch(error) {
                        Alert.alert('Não foi possivel remover');
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStorage = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStorage[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWatered(
                `Não esqueça de regar a ${plantsStorage[0].name} \n dentro de ${nextTime}.`
            )

            setMyPlants(plantsStorage);
            setLoading(false);

        }

        loadStorageData();
    },[] )

    if(loading)
        return<Load />

    return (
        <View style={styles.container}>
            <Header/>

            <View style={styles.spotlight} >
                <Image 
                    source={waterDrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWaterd}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Proximas regadas
                </Text>

                <FlatList
                    data={myPlants}
                    
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardSecondary 
                            data={item} 
                            handleRemove={() => {handleRemove(item)} }
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60,
    },
    spotlightText: {
        color: colors.blue,
        padding: 20,
        textAlign: 'justify'
    },  
    plants: {
        flex: 1,
        width: '100%',

    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,

    },
})