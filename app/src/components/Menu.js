import React, { Component } from 'react';
import { ScrollView, View, Text, Image, StatusBar, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import {connect} from 'react-redux';
import MenuSection from './Presenters/MenuSection';
import {getChannels, chatUpdate, getUsers} from './../redux/actions';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Menu extends Component{
    constructor(props) {
        super(props)
        this.state = {
           updated: false,
           checkedUser: false
        }
    }

    componentDidMount(){
        this.props.getChannels();
        this.props.getUsers();
    }

    async componentWillReceiveProps(nextProps){
        if(nextProps.channels.length > 0 && !this.state.updated){
            this.setState({updated: true});
            
            this.props.chatUpdate({prop: 'activeChannel', value: nextProps.channels[0]}); 
            Actions.channelScreen({title: nextProps.channels[0].name});
            
        }

        if(nextProps.users.length > 0 && !this.state.checkedUser){
           this.syncUsers()
           this.setState({checkedUser: true});
        }

    }

    async syncUsers(){
        const {streamToken, users, user, chatClient} = this.props;

        users.map( async (item) => {
            if(item.id != user.username){
                console.log(item, "item")
              
                const conversation = chatClient.channel('messaging', {
                    members: [user.username, item.id]
                });
                let converse = await conversation.create(); 
                console.log(converse);
            }
      
        })
        
    }


    render(){
        const {channels, users} = this.props;
        
        return(
            <View style={{flex: 1, backgroundColor: '#3F0E40'}}>
                 <View style={{marginBottom: 15}}>
                    <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                        <TouchableOpacity style={{justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 18}}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent: 'center'}}>
                            <Icon name="shape-outline" color={'white'} size={25} />
                        </TouchableOpacity>
                    </View>
                
                </View>
                <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor: '#3F0E40'}}>
                    
                    <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 14}}>CHANNELS</Text>
                        </View>
                        <TouchableOpacity onPress={() => Actions.createChannel()} style={{justifyContent: 'center'}}>
                            <Icon name="plus-circle-outline" color={'#cfc3cf'} size={20} />
                        </TouchableOpacity>
                    </View>
                    {channels.map((item, index) => {
                        if(!item.name) return;
                        return(
                            <MenuSection 
                                name={item.name} 
                                key={index} 
                                privateChannel={false}
                                onPress={() => {
                                    this.props.chatUpdate({prop: 'activeChannel', value: item}); 
                                    Actions.pop();
                                    Actions.refresh({title: item.name, key: Math.random()});
                                }  
                                    
                                }
                            />)
                    })}

                    <View style={{flexDirection: 'row', padding: 10, marginTop: 20, justifyContent: 'space-between'}}>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 13}}>DIRECT MESSAGES</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent: 'center'}}>
                            <Icon name="plus-circle-outline" color={'#cfc3cf'} size={20} />
                        </TouchableOpacity>
                    </View>

                    {users.map((item, index) => {
                        
                        return(
                            <MenuSection 
                                name={item.id} 
                                key={index} 
                                privateChannel={true}
                                onPress={() => {
                                    this.props.chatUpdate({prop: 'activeChannel', value: item}); 
                                    Actions.pop();
                                    Actions.refresh({title: item.id, key: Math.random()});
                                }  
                                    
                                }
                            />)
                    })}
                    
                </ScrollView>
            </View>
        );
    }
}


menuHeight = Dimensions.get('screen').height


const mapStateToProps = (state) => {
    const {user, users, streamToken, chatClient} = state.auth;
    const {loading, channels} = state.chat;
    return {loading, channels, user, users, streamToken, chatClient}
}

const mapDispatchToProps = {
    getChannels, chatUpdate, getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);