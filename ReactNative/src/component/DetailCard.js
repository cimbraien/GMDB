import { NavigationContainer } from '@react-navigation/native'
import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, TouchableOpacity, Button } from 'react-native'
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import ReviewForm from './ReviewForm';

const DetailCard = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View>
            <View style={styles.homeCard} key={props.id}>
                <Image style={{ height: 200, width: 340, }} source={{ uri: "https://image.tmdb.org/t/p/w500" + props.poster }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>{props.title}</Text>
                    <Text>2019</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, width: 250 }}>
                    <View>
                        <Image style={{ height: 200, width: 100, }} source={{ uri: "https://image.tmdb.org/t/p/w500" + props.poster }} />
                    </View>
                    <View style={{ margin: 10 }}>
                        <View style={{ flexDirection: 'row', width: 230, justifyContent: 'flex-end' }}>
                            <View style={{ marginRight: 40 }}>
                                <Icon name="star" size={20} color="black" />
                                <Text>9/10</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={toggleModal}>
                                    <Icon name="star" size={20} color="black" />
                                    <Text>Rate</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <Text>{props.overview}</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => props.onClickIcon()}>
                            <Icon name="comment" size={20} color="black" />
                            <Text>{props.vote}</Text>
                        </TouchableOpacity>
                    </View>
                    <Icon name="share-alt" size={20} color="black" />
                </View>
            </View>

            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1 }}>
                    <ReviewForm />
                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
            </Modal>
        </View>
    )
}

export default DetailCard

const styles = StyleSheet.create({
    homeCard: {
        backgroundColor: 'white',
        padding: 15,
        margin: 10,
        elevation: 10,
        borderRadius: 8
    }
})
