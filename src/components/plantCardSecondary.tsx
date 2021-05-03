import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import {
    RectButton,
    RectButtonProps
} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import {SvgFromUri} from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };

    handleRemove: () => void;
}


export const PlantCardSecondary = ({data, handleRemove, ...rest} : PlantProps) => {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={()=> (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather 
                                name="trash"
                                size={32}
                                color={colors.white}
                            />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
            style={styles.container}
            {...rest}
            >
                <SvgFromUri uri={ data.photo } 
                    width={50}
                    height={50}
                />

                <Text style={styles.title}>
                    {data.name}
                </Text>

                <View style={styles.details}>
                    <Text style={styles.timeText}>
                        Regar às:
                    </Text>
                    <Text style={styles.timeLabel}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        marginLeft: 10,
        flex: 1
    },
    details: {
        alignItems: 'flex-end'
    },
    timeText: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_light
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.green_dark,
        marginTop: 5,
    },
    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15,
    },
});