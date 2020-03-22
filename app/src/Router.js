import React, { Component } from 'react';
import { Scene, Router, Stack} from 'react-native-router-flux';
import Chat from './components/Chat';
import ChannelListScreen from './components/ChannelListScreen';
import ChannelScreen from './components/ChannelScreen';
import ThreadScreen from './components/ThreadScreen';
import AuthScreen from './components/AuthScreen';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import Menu from './components/Menu';
import RegisterScreen from './components/RegisterScreen';

class RouterComponent extends Component {

    constructor(props) {
        super();
       this.state = {
            permissions: {},
       }
    }

    render() {
       
        return (
             
                <Router>     
                    <Stack key="root" hideNavBar>
                        <Scene
                            key={'auth'}
                            initial
                            component={AuthScreen}
                        />
                        <Scene
                            key={'register'}
                            // initial
                            component={RegisterScreen}
                        />
                        <Scene
                            key={'chat'}
                            component={Chat}
                        />
                        <Scene 
                            drawer={true}
                            drawerIcon={<View style={{padding: 15, backgroundColor: 'black'}}></View>}
                            key={'dashboard'}
                            contentComponent={Menu}
                            drawerWidth={Dimensions.get('window').width * 0.7}>
                            
                            <Scene
                                key={'channelList'}
                                back={false}
                                navigationBarStyle={{elevation: 0}}
                                hideNavBar={false}
                                backButtonTintColor={'white'}
                                component={ChannelListScreen}
                            />
                            <Scene
                                key={'channelScreen'}
                                hideNavBar={false}
                                title={''}
                                component={ChannelScreen}
                            />
                            
                        </Scene>
                      
                        <Scene
                            key={'threadScreen'}
                            component={ThreadScreen}
                        />
                    </Stack>
                </Router>
          
        );
    }
}

const styles = {


}

export default RouterComponent;
