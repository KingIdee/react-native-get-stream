import React, { PureComponent } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { StreamChat } from 'stream-chat';
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

const chatClient = new StreamChat('qk4nn7rpcn75');
const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYmlsbG93aW5nLWZpcmVmbHktOCJ9.CQTVyJ6INIM8u28BxkneY2gdYpamjLzSVUOTZKzfQlg';
  const user = {
    id: 'billowing-firefly-8',
    name: 'Billowing firefly',
    image:
      'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
  };
  
const filters = { type: 'messaging' };
const sort = { last_message_at: -1 };
const options = {
  state: true,
  watch: true
}

/**
 * Start playing with streami18n instance here:
 * Please refer to description of this PR for details: https://github.com/GetStream/stream-chat-react-native/pull/150
 */
const streami18n = new Streami18n({
  language: 'en'
});

class ThreadScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
      headerTitle: <Text style={{ fontWeight: 'bold' }}>Thread</Text>,
      headerLeft: null,
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            backgroundColor: '#ebebeb',
            width: 30,
            height: 30,
            marginRight: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
          }}>
          <CloseButton />
        </TouchableOpacity>
      ),
    });
  
    render() {
      const { navigation } = this.props;
      const thread = navigation.getParam('thread');
      const channel = chatClient.channel(
        'messaging',
        navigation.getParam('channel'),
      );
  
      return (
        <SafeAreaView>
          <Chat client={chatClient} i18nInstance={streami18n}>
            <Channel
              client={chatClient}
              channel={channel}
              thread={thread}
              dummyProp="DUMMY PROP">
              <View
                style={{
                  display: 'flex',
                  height: '100%',
                  justifyContent: 'flex-start',
                }}>
                <Thread thread={thread} />
              </View>
            </Channel>
          </Chat>
        </SafeAreaView>
      );
    }
  }

  export default ThreadScreen;