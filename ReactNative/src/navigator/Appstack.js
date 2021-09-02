import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screen/Login';
import Register from '../../../reactnativeteam_b/src/screen/Register';

const Stack = createStackNavigator();

const appStack = (props) => {
    return(
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='MainNavigator' component={mainNavigator} />
    </Stack.Navigator>
    )
}

export default appStack