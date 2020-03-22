import React, { Component } from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuSection = ({ onPress, name, rightButton, iconName, icon}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{padding: 10}}>  
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>        
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        {
                        icon ? 
                            <Text style={{color: '#cfc3cf', fontSize: 14}}>{icon}     {name}</Text>
                        :
                        <View style={{justifyContent: 'center', flexDirection: 'row', marginRight: 10}}>  
                            <Icon name={'lock'} color={'#cfc3cf'}/> 
                            <Text style={{color: '#cfc3cf', fontSize: 14}}>     {name}</Text>
                            
                        </View>
                        }
                    </View>
                    
                    <View style={{justifyContent: 'center', marginRight: 10}}>
                        {rightButton ? <Icon name={iconName} size={22} color={'#cfc3cf'}/> : null}
                    </View>
                    
                </View>  
        </TouchableOpacity>
    );
};


export default MenuSection;
