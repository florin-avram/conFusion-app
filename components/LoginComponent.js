import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {Card, Icon, Input, CheckBox} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: false,
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({
                        username: userinfo.username,
                        password: userinfo.password,
                        rememberMe: true,
                    })
                }
            })
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.rememberMe) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                }))
                .catch((error) => console.log('Could not save user info', error))
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Input 
                    placeholder='Username'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input 
                    placeholder='Password'
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.rememberMe}
                    onPress={() => {this.setState({
                        rememberMe: !this.state.rememberMe,
                    })}}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        color='#512DA8'
                        />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin: 20,
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null,
    },
    formButton: {
        margin: 60,
    },
});

export default Login;