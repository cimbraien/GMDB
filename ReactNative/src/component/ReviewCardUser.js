import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';


const ReviewCardUser = () => {
    return (

        <View style={styles.reviewCard}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.profile} />
                <View>
                    <Text>TITLE</Text>
                    <Text>Reviewed</Text>
                    <Text>Rating 5/5</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name="pencil" size={10} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name="trash" size={10} color="black" />
                    </TouchableOpacity >
                    </View>
                </View>

            </View>
            <Text>HEADLINE</Text>
            <Text>REVIEW DESCRIPTION</Text>
        </View>
    )
}

export default ReviewCardUser

const styles = StyleSheet.create({
    reviewCard: {
        backgroundColor: 'white',
        padding: 15,
        margin: 15,
        elevation: 10,
        borderRadius: 15
    },
    btn: {
        position: 'absolute',
        right: 10,
        top: 10
    },

    profile: {
        height: 100,
        width: 80,
        backgroundColor: 'white',
        borderWidth: 1,
    },

    icon: {
        height: 20,
        width: 20,
        backgroundColor: 'orange',
        borderRadius: 100 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 16
    },
})
