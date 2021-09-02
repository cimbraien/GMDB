import React, { Component } from 'react';
import { 
    StyleSheet, 
    View,
    Image,
    Text
} from 'react-native';

export default class Logo extends Component {
    render() {
       return (
        //    <Text>Test</Text>
        <View style={styles.container}>
           <Image style={{width: 120, height: 100}} 
                source={require('../images/movapplogo.png')}/>
            <Text style={styles.logoText}>MovReact</Text>     
        </View>   
       ) 
    }
}

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logoText : {
        marginVertical: 15,
        fontSize: 20,
        color: '#ffffff'
    }
});
