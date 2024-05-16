import { View, Text } from 'react-native';
import React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SingIn from '../screens/SingIn';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import NewPassword from '../screens/NewPassword';
import HomeScreen from '../screens/HomeScreen/Index';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions= {{headerShown: false}}>
            <Stack.Screen name= "SignIn" component={SingIn} />
            <Stack.Screen name= "SignUp" component={SignUp} />
            <Stack.Screen name= "ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name= "NewPassword" component={NewPassword} />
            <Stack.Screen name= "Home" component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;