import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity, StatusBar, Image} from 'react-native';
import {connect} from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import {authUpdate, login, getChannels} from './../redux/actions';
import {LoadingIndicator, Spinner} from 'stream-chat-react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from '@react-native-community/checkbox';

class CreateChannel extends Component{

    constructor(props){
        super(props);
        this.state = {
            channelName: '',
            members: [],
            loading: false
        }
    }

    async fireCreateChannel(){
        const {streamToken, user, chatClient} = this.props;
        let {channelName, members} = this.state;
      
        members.push(user.username);
        this.setState({loading: true});
 
        const conversation = chatClient.channel('messaging', channelName, {
            name: channelName,
            image: 'http://bit.ly/2O35mws',
            members
        });
        
        await conversation.create();
        this.setState({loading: false});
        this.props.getChannels();
        Actions.pop();
    }

    process(username){
        let members = this.state.members;

        if(members.includes(username)){
            members.filter(item => {
                return item != username
            })
        }else{
            members.push(username);
        }

        this.setState({members})

    }

    login(){
        const {username, password} = this.props;
        this.props.login({username, password});
    }

    render(){
        const {username, password, users, loading} = this.props;
        const {channelName} = this.state;
        return (
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1, padding: 20}} style={{  backgroundColor: '#3F0E40'}}>
                <StatusBar barStyle={'light-content'} backgroundColor={'#3F0E40'} />
                <View>
                    
                    <View style={{borderWidth: 1, marginBottom: 20, marginTop: 40, borderColor: 'white', borderRadius: 5}}>
                        <TextInput
                            placeholder={'Channel Name'}
                            value={channelName}
                            style={{color: 'white', paddingLeft: 10}}
                            placeholderTextColor={'white'}
                            onChangeText={(value) => this.setState({channelName: value})}
                        />
                    </View>

                    <View>
                        {users.map((item, index) => {
                        return(
                            <View key={index} style={{flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center'}}>
                                    <CheckBox
                                        value={this.state.members.includes(item.id)}
                                        tintColors={{true: 'white'}}
                                        onChange={() => this.process(item.id)}
                                        disabled={false}
                                    />
                                </View>
                                <View style={{justifyContent: 'center'}}>
                                    <Text style={{color: 'white'}}>{item.id}</Text>
                                </View>
                            </View>)
                        })}
                    </View>
                    
                    <View style={{marginTop: 20}}>
                        <TouchableOpacity style={{backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', padding: 15, borderRadius: 5}} onPress={() => this.fireCreateChannel()}>
                            {loading ? <Spinner /> : <Text style={{color: '#3F0E40', textAlign: 'center'}}>Create</Text>}
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    const {username, password, users, user, streamToken, chatClient, firstName, lastName, email, loading} = state.auth;
    return {username, password, users, user, streamToken, chatClient, firstName, lastName, email, loading}
}

const mapDispatchToProps = {
    authUpdate, login, getChannels
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel);