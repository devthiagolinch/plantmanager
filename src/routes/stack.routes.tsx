import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/welcome';
import { UserIdentification } from '../pages/userIdentification';
import { Confirmation } from '../pages/confirmation';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <StackRoutes.Screen 
            name="Welcome"
            component={Welcome}
        />
        <StackRoutes.Screen 
            name="userIdentification"
            component={UserIdentification}
        />
        <StackRoutes.Screen 
            name="confirmation"
            component={Confirmation}
        />
        
    </StackRoutes.Navigator>
)

export default AppRoutes;