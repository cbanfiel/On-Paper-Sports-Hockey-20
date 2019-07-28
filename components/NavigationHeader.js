import React from 'react';
import { Header, Icon, View } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {selectedTeam} from '../data/script';
import CachedImage from './CachedImage';



class NavigationHeader extends React.Component {

    render() {
        return (
            <Header backgroundColor='rgba(0,0,0,0.75)'
                leftComponent={Actions.currentScene!='mainmenu'? <TouchableOpacity onPress={() => Actions.pop()}><Icon name="arrow-back" color='white' ></Icon></TouchableOpacity>: null}
                centerComponent={{ text: "On Paper Sports Basketball 2020", style: { color: 'white', fontSize: 18, fontFamily: 'advent-pro' } }} 
                rightComponent={Actions.currentScene!='mainmenu'? <TouchableOpacity onPress={() =>{ Actions.popTo('mainmenu')}}><Icon name="home" color='white' ></Icon></TouchableOpacity> : null}/>
                
        )

    }
}

export default NavigationHeader;