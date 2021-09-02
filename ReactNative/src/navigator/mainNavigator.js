import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Homescreen from '../screen/homeScreen';
import reviewScreen from '../screen/reviewScreen';
import ProfileScreen from '../screen/profileScreen';
import detailScreen from '../screen/detailScreen';
import reviewMovieScreen from '../screen/reviewMovieScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const homeStack = (props) => {
    return(
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name='Detail' component={detailScreen} />
        <Stack.Screen name='ReviewAll' component={reviewMovieScreen} />
    </Stack.Navigator>
    )
}

const MainNavigator = (props) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (route.name === 'Review') {
                        iconName = focused ? 'newspaper' : 'newspaper-outline'
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline'
                    }

                    return <Ionicons name={iconName} size={30} color={color} />
                },
            })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'black',
                showLabel: false,
            }}
        >
            <Tab.Screen name="Home" component={homeStack} />
            <Tab.Screen name="Review" component={reviewScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default MainNavigator
