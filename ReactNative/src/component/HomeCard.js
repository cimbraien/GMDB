import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeCard = (props) => {

    return (
        <View>
            <View style={styles.homeCard} key={props.id}>
                <Image style={{ height: 300, width: 350, resizeMode: 'cover' }} source={{ uri: "https://image.tmdb.org/t/p/w500" + props.poster }} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{props.title}</Text>
                <Text style={{ marginBottom: 10 }}>OVERVIEWWW</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={()=>props.onClickIcon()}>
                            <Icon name="comment" size={20} color="black" />
                            <Text>{props.vote}</Text>
                        </TouchableOpacity>
                    </View>
                    <Icon name="share-alt" size={20} color="black" />
                </View>
            </View>
        </View>
    )
}

export default HomeCard

const styles = StyleSheet.create({
    homeCard: {
        backgroundColor: 'white',
        padding: 15,
        margin: 10,
        elevation: 10,
        borderRadius: 8
    }
})
