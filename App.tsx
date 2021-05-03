import React, {useEffect} from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import Routes from './src/routes'
import { PlantProps } from './src/libs/storage';

import { useFonts, Jost_600SemiBold, Jost_400Regular } from '@expo-google-fonts/jost';


export default function APP(){
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    const subscriptions = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps
        console.log(data)
      });

      return() => subscriptions.remove();
  },[])

  if(!fontsLoaded)
    return <AppLoading />

  return(
    <Routes />
  )
}