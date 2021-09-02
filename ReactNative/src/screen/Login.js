import React, { Component } from 'react';
import { 
    StyleSheet, 
    View,
    StatusBar,
    Text
} from 'react-native';

import Logo from '../components/Logo/';
import Form from '../components/Form/';


export default class Home extends Component {
    render() {
       return (
        <View style={styles.container}>
            <Logo />
            <Form type='Sign In'/>
            <View style={styles.signupTextContent}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <Text style={styles.signupButton}onPress={()=>this.props.navigation.navigate('Register')}> Sign Up</Text>
            </View>
        
        </View>
       ) 
    }
}


const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center"
    },
    signupTextContent: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginVertical: 16,
        color: '#ffffff',
        flexDirection: 'row'
    },
    signupText: {
        color: '#f5f5f5',
        fontSize: 15,
        fontWeight: 'normal'
    },
    signupButton: {
        color: '#fdc700',
        fontSize: 15,
        fontWeight: 'bold'
    }
});
