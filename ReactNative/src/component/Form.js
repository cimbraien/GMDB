import React, { Component } from 'react';
import { 
    StyleSheet, 
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class Form extends Component {
    
    render() {
        {console.log(this.props,'props')} 
       return (
        <View style={styles.container}>
            {this.props.type == 'Register' && <TextInput style={styles.inputBox} 
            underlineColorAndroid='#444343' 
            placeholder='Full Name' 
            placeholderTextColor='#919191'
            />}
            
            <TextInput style={styles.inputBox} 
            underlineColorAndroid='#444343' 
            placeholder='Username' 
            placeholderTextColor='#919191'
            />
            <TextInput style={styles.inputBox} 
            underlineColorAndroid='#444343' 
            placeholder='Email'
            secureTextEntry = {false} 
            placeholderTextColor='#919191'
            />
            {this.props.type == 'Register' && <TextInput style={styles.inputBox} 
            underlineColorAndroid='#444343' 
            placeholder='Password'
            secureTextEntry = {true} 
            placeholderTextColor='#919191'
            />}
            

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{this.props.type}</Text>
            </TouchableOpacity>
            
        </View>   
       ) 
    }
}

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        width: 300,
        backgroundColor: '#444343',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#f5f5f5',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        marginVertical: 10,
        paddingVertical: 10

    },

    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center'
    }
});
