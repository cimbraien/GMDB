import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'


const ReviewCardAll = () => {
    return (

        <View style={styles.reviewCard}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.profile} />
                <View>
                    <Text>9/10</Text>
                    <Text>Reviewer</Text>
                </View>
                <Text>HEADLINE</Text>
            </View>

            <Text>REVIEW DESCRIPTION</Text>
        </View>
    )
}

export default ReviewCardAll

const styles = StyleSheet.create({
    reviewCard: {
        backgroundColor: 'white',
        padding: 15,
        margin: 15,
        elevation: 10,
        borderRadius: 8
    },
    btn: {
        position: 'absolute',
        right: 10,
        top: 10
    },

    profile: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 100 / 2,
    },
})
