import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import profileImg from '../assets/79920937.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header(){
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Thiago</Text>
            </View>
            <View>
                <Image style={styles.profile}
                    source={profileImg}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        width: '100%',
        marginTop: getStatusBarHeight(),
        flexDirection: 'row',
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40,
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
});
