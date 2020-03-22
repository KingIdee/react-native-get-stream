import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, StatusBar, Image} from 'react-native';
import {connect} from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import {authUpdate, login} from './../redux/actions';
import {LoadingIndicator, Spinner} from 'stream-chat-react-native';
import { Actions } from 'react-native-router-flux';

class AuthScreen extends Component{


    login(){
        const {username, password} = this.props;
        this.props.login({username, password});
    }

    render(){
        const {username, password, loading} = this.props;
        return (
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1, padding: 20, justifyContent: 'center'}} style={{  backgroundColor: '#3F0E40'}}>
                <StatusBar barStyle={'light-content'} backgroundColor={'#3F0E40'} />
                <View>
                    <Image
                        source={{uri: 'https://studio.aboki.africa/static/media/full-logo-white.3a9fa94b.png'}}
                        style={{height: 40, width: 100, alignSelf: 'center', marginBottom: 50}}
                        resizeMode={'contain'}
                    />
                    <View style={{borderWidth: 1, marginBottom: 20, borderColor: 'white', borderRadius: 5}}>
                        <TextInput
                            placeholder={'Username'}
                            value={username}
                            style={{color: 'white', paddingLeft: 10}}
                            placeholderTextColor={'white'}
                            onChangeText={(value) => this.props.authUpdate({prop: 'username', value})}
                        />
                    </View>
                    <View style={{borderWidth: 1, marginBottom: 20,  borderColor: 'white', borderRadius: 5}}>
                        <TextInput
                            placeholder={'Password'}
                            placeholderTextColor={'white'}
                            value={password}
                            style={{color: 'white', paddingLeft: 10}}
                            onChangeText={(value) => this.props.authUpdate({prop: 'password', value})}
                            secureTextEntry
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <TouchableOpacity style={{backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', padding: 15, borderRadius: 5}} onPress={() => this.login()}>
                            {loading ? <Spinner /> : <Text style={{color: '#3F0E40', textAlign: 'center'}}>Login</Text>}
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop: 20}}>
                        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end',}} onPress={() => Actions.register()}>
                            <Text style={{color: 'white', textAlign: 'center'}}>No Account Yet? Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    const {username, password, firstName, lastName, email, loading} = state.auth;
    return {username, password, firstName, lastName, email, loading}
}

const mapDispatchToProps = {
    authUpdate, login
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);