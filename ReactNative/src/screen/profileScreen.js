
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Ionicon from 'react-native-vector-icons/Ionicons';


const profileScreen = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor:'black'}}>
            <View style={styles.profile} >
                <Ionicon name='cart' size={50} color='blue' />
            </View>
            <TouchableOpacity style={styles.loginBtn}>
                <Text>LOGOUT</Text>
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    profile: {
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 100 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 16
    },

    loginBtn: {
        width: "30%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "white",
        color: 'black'
    },
});

export default profileScreen;