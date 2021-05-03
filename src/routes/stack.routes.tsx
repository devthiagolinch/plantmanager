import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/welcome';
import { UserIdentification } from '../pages/userIdentification';
import { Confirmation } from '../pages/confirmation';
import { PlantSave } from '../pages/plantSave';
import AuthRoutes from './tab.routes';

import colors from '../styles/colors';
import { MyPlant } from '../pages/myPlant';


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
        <StackRoutes.Screen 
            name="plantSelect"
            component={AuthRoutes}
        />
        <StackRoutes.Screen 
            name="plantSave"
            component={PlantSave}
        />
         <StackRoutes.Screen 
            name="myPlant"
            component={AuthRoutes}
        />
    </StackRoutes.Navigator>
)

export default AppRoutes;