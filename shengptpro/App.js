import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dalle from './src/pages/dalle';
import Chatgpt from './src/pages/chatgpt';
import Home from './src/pages/Home';
import Speak from './src/pages/speaking';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer  >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen  name="Home" component={Home} />
        <Stack.Screen name="Chatgpt" component={Chatgpt} />
        <Stack.Screen name="Dalle" component={Dalle} />
        <Stack.Screen name="Speak" component={Speak} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




