import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Rating } from 'react-native-ratings'

const ReviewForm = (props) => {

    return (
        <View style>
            <View style={styles.DetailCard}>
                <Text>How do you think about this movie?</Text>
                <Rating
                    type='star'
                    ratingCount={5}
                    imageSize={30}
                />
                <Text>Your rating : </Text>
                <TextInput style={styles.input1} placeholder='Write a headline for your review here' />
                <TextInput style={styles.input2} placeholder='Write your review here' />
                <TouchableOpacity style={styles.loginBtn}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ReviewForm

const styles = StyleSheet.create({
    DetailCard: {
        backgroundColor: '#EDC001',
        padding: 15,
        margin: 1,
        elevation: 10,
        borderRadius: 8,
        alignItems: 'center'
    },
    input1: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 8,
        height: 40,
        width: 300,
    },

    input2: {
        backgroundColor: 'white',
        margin: 5,
        height: 100,
        width: 300,
        borderRadius: 8
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

})