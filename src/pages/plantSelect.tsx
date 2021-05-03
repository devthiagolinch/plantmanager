import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

import api from '../services/api';

import {Entypo} from '@expo/vector-icons';

import { EnviromentButton } from '../components/enviromentBtton';
import { PlantCardPrimary } from '../components/plantCardPrimary';
import { Header } from '../components/header';
import {Load} from '../components/load';


import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';



interface EnviromentProps {
    key: string;
    title: string;
}

export function PlantSelect(){
    const [enviroment, setEnviroment] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const navigation = useNavigation();
    
    function handleEnviromentSelected(enviroment: string){
        setEnviromentSelected(enviroment);

        if(enviroment === 'all') return setFilteredPlants(plants);
        
        const filtered = plants.filter(plant => 
            plant.environments.includes(enviroment)
        );

        setFilteredPlants(filtered);
    }

    async function fetchPlants(){
        const {data} = await api
        .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true);
        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }
        
        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number) {
        if(distance < 1)
            return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    function handlePlantSelect(plant: PlantProps){
        navigation.navigate('plantSave', { plant });
    }

    useEffect(() => {
        async function fetchEnviroment(){
            const {data} = await api
            .get('plants_environments?_sort=title&_order=asc');
            setEnviroment([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);

        }

        fetchEnviroment();
    },[])

    useEffect(() => {
        fetchPlants();
    },[])


    if(loading)
        return<Load />
        
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subTitle}>
                    você quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList
                    
                    data={enviroment}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButton 
                            title={item.title}
                            active={item.key === enviromentSelected}
                            onPress={() => handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardPrimary
                            data={item}
                            onPress={() => handlePlantSelect(item) }
                        />
                    )}
                    
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd) }
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green} />
                        : <></>
                    }
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background

    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 20,
        marginTop: 10
    },
    subTitle: {
        fontSize: 17,
        fontFamily: fonts.text,
        color: colors.heading
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginVertical: 32,
        marginLeft: 32
    },
    plants: {
        flex: 1
    },
    plantsCard: {
    },
});