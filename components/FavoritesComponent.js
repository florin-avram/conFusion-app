import React, { Component } from 'react';
import { FlatList, Alert} from 'react-native';
import { Avatar, ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes:state.dishes,
        favorites: state.favorites,
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { navigate } = this.props.navigation;         
        const renderMenuItem = ({ item, index }) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?', 
                            'Are you sure you wish to delete the favorite dish ' + item.name,
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log(item.name + ' Not deleted'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.id),
                                    style: 'cancel',
                                },
                            ],
                            { cancealable: false }
                        )
                    },
                }
            ];
            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <Animatable.View
                        animation="fadeInRightBig"
                        duration={2000}
                    >
                        <ListItem
                            key = {index}
                            onPress={() => navigate('DishDetail', { dishId: item.id })}
                        >
                            <Avatar 
                                rounded
                                source={{uri: baseUrl + item.image}}
                            />
                            <ListItem.Content>
                                <ListItem.Title> {item.name} </ListItem.Title>
                                <ListItem.Subtitle> {item.description} </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </Animatable.View>
                </Swipeout>
            );
        }

        if (this.props.dishes.isLoading) {
            return (<Loading />);
        } else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>
                        {this.props.dishes.errMess}
                    </Text>
                </View>
            )
        } else {
            const favoriteDishes = this.props.dishes.dishes.filter((dish) => 
                this.props.favorites.includes(dish.id)
            );

            return (
                <FlatList
                    data={favoriteDishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)