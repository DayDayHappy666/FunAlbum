import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/HomeScreen';
import PreviewNewScreen from './src/PreViewNewScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PreviewScreen"
          component={PreviewNewScreen}
          options={{
            presentation: 'transparentModal',
            headerBackTitleVisible: false,
            headerTitle: '',
            headerShadowVisible: false,
            headerShown: false,
            cardOverlayEnabled: true,
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
