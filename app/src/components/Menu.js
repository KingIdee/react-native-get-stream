import React, { Component } from 'react';
import { ScrollView, View, Image, StatusBar, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import {connect} from 'react-redux';
import MenuSection from './Presenters/MenuSection';
import {getChannels, chatUpdate} from './../redux/actions';
import { Actions } from 'react-native-router-flux';

class Menu extends Component{
    constructor(props) {
        super(props)
        this.state = {
           updated: false
        }
    }

    componentDidMount(){
        this.props.getChannels();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.channels.length > 0 && !this.state.updated){
            this.setState({updated: true})
            this.props.chatUpdate({prop: 'activeChannel', value: nextProps.channels[0]}); 
            Actions.channelScreen({title: nextProps.channels[0].name});
        }
    }


    render(){
        const {channels} = this.props;
        
        return(
            <View style={{flex: 1, backgroundColor: '#3F0E40'}}>
                 <View style={{marginBottom: 15}}>
                    <MenuSection name={'HOME'} rightButton iconName={'crop-square'} />
                
                </View>
                <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor: '#3F0E40'}}>
                   
                    <MenuSection name={'CHANNELS'} rightButton iconName={'plus-circle-outline'} />
                    {channels.map((item, index) => {
                        
                        return(<MenuSection 
                            name={item.name} key={index} 
                            onPress={() => {
                                this.props.chatUpdate({prop: 'activeChannel', value: item}); 
                                Actions.refresh({title: item.name});}  
                                
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
    const {loading, channels} = state.chat;
    return {loading, channels}
}

const mapDispatchToProps = {
    getChannels, chatUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);