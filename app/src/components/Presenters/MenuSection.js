import React, { Component } from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuSection = ({ onPress, name, privateChannel}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{padding: 10}}>  
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>        
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        {
                        !privateChannel ? 
                            <View style={{justifyContent: 'center'}}>
                                <Text style={{color: '#cfc3cf', fontSize: 14}}>#     {name}</Text>
                            </View>
                        :
                        <View style={{justifyContent: 'center', flexDirection: 'row', marginRight: 10}}>  
                            <View style={{justifyContent: 'center'}}>
                                <Icon name={'lock'} color={'#cfc3cf'}/> 
                            </View>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={{color: '#cfc3cf', fontSize: 14}}>     {name}</Text>
                            </View>
                        </View>
                        }
                    </View>
                 
                </View>  
        </TouchableOpacity>
    );
};


export default MenuSection;
