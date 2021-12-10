import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StartScreen from './app/screens/StartScreen';
import LanguageSelection from './app/screens/LanguageSelection';
import QuizSelection from './app/screens/QuizSelection';
import ConfigScreen from './app/screens/ConfigScreen';
import RenderQuiz from './app/screens/RenderQuiz';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
  useFonts 
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();
function App() {

  let [fontsLoaded, error] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic 
});

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen" screenOptions={{headerShown: false }}>
        <Stack.Screen name='StartScreen' component={StartScreen} /> 
        <Stack.Screen name='LanguageSelection' component={LanguageSelection} /> 
        <Stack.Screen name='QuizSelection' component={QuizSelection} /> 
        <Stack.Screen name='RenderQuiz' component={RenderQuiz} />
        <Stack.Screen name='ConfigScreen' component={ConfigScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



