import React, { Component } from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { calculateOpacity } from '../../helper';
import {connect} from 'react-redux';


class DrawerIcon extends Component{

    getLetter(){
        if(this.props.activeChannel.name){
            return this.props.activeChannel.name.substring(0, 2).toUpperCase();
        }
        return '*'
    }

    render(){
        return (
            <View style={{padding: 7, borderRadius: 2, backgroundColor: '#ffffff'+calculateOpacity(30)}}>
                <Text style={{textAlign: 'center', color: 'white'}}>{this.getLetter()}</Text>
            </View>
        );
    }
};

const mapStateToProps = state => {
    const {activeChannel} = state.chat;
    return {activeChannel}
}

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerIcon);

