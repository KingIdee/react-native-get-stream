import React, { PureComponent } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { StreamChat } from 'stream-chat';
import {authUpdate, login} from './../redux/actions';
import {connect} from 'react-redux';
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

// Read more about style customizations at - https://getstream.io/chat/react-native-chat/tutorial/#custom-styles
const theme = {
  avatar: {
    image: {
      size: 32,
    },
  },
  colors: {
    primary: '#3F0E40',
  },
  spinner: {
    css: `
      width: 15px;
      height: 15px;
    `,
  },
};

class ChannelScreen extends PureComponent {

    render() {
      const {chatClient, streami18n, activeChannel} = this.props;
      let conversation = chatClient.channel('messaging', activeChannel.id, {
        name: activeChannel.name
      });
   
      return (
        <SafeAreaView>
          <Chat client={chatClient} style={theme} i18nInstance={streami18n}>
            <Channel client={chatClient} channel={conversation}>
              <View style={{ display: 'flex', height: '100%' }}>
                <MessageList
                  onThreadSelect={thread => {
                    this.props.navigation.navigate('Thread', {
                      thread,
                      channel: channel.id,
                    });
                    alert(channel.id)
                  }}
                />
                <MessageInput />
              </View>
            </Channel>
          </Chat>
        </SafeAreaView>
      );
    }
  }

  const mapStateToProps = state => {
    const {user, streamToken, chatClient} = state.auth;
    const { activeChannel} = state.chat;
    return {user, streamToken, chatClient, activeChannel}
  }

  const mapDispatchToProps = {
    authUpdate
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ChannelScreen);