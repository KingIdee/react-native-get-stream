import React, { PureComponent } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import {connect} from 'react-redux';
import { StreamChat } from 'stream-chat';
import {authUpdate, login} from './../redux/actions';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  ChannelList,
  Thread,
  CloseButton,
  ChannelPreviewMessenger,
  Streami18n
} from 'stream-chat-react-native';

import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Actions } from 'react-native-router-flux';

// Read more about style customizations at - https://getstream.io/chat/react-native-chat/tutorial/#custom-styles
const theme = {
  avatar: {
    image: {
      size: 32,
    },
  },
  colors: {
    primary: 'magenta',
  },
  spinner: {
    css: `
      width: 15px;
      height: 15px;
    `,
  },
};

const filters = { type: 'messaging' };
const sort = { last_message_at: -1 };
const options = {
  state: true,
  watch: true
}

class ChannelListScreen extends PureComponent {

    constructor(){
        super();
        this.state = {
            clientReady: false
        }
    }
    
    async componentDidMount(){
        const {streamToken, user, chatClient} = this.props;
        let chatUser = {
          id: user.username,
          name: user.firstName +' '+ user.lastName,
          image: user.avatar
        }
        await chatClient.setUser(chatUser,streamToken);
                    
        this.setState({clientReady: true})

        const conversation = chatClient.channel('messaging', 'Betting', {
          name: 'Betting',
          image: 'http://bit.ly/2O35mws',
      });
        
        await conversation.create();
    }

    render() {
      const {chatClient, streami18n} = this.props;
      return (
        
        <SafeAreaView>
          {this.state.clientReady ? 
          <Chat client={chatClient} style={theme} i18nInstance={streami18n}>
            <View style={{ display: 'flex', height: '100%', padding: 10 }}>
              <ChannelList
                filters={filters}
                sort={sort}
                options={options}
                Preview={ChannelPreviewMessenger}
                onSelect={channel => { this.props.authUpdate({prop: 'activeChannel', value: channel}); Actions.channelScreen({title: channel.data.name}); }}
              />
            </View>
          </Chat>
          : null}
        </SafeAreaView>
      );
    }
  }

const mapStateToProps = state => {
    const {user, streamToken, chatClient} = state.auth;
    return {user, streamToken, chatClient}
}

const mapDispatchToProps = {
  authUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelListScreen);