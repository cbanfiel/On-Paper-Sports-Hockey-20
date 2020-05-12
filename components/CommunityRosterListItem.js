import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import CachedImage from './CachedImage';




export default class CommunityRosterListItem extends React.Component {

    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
            <View style={{ backgroundColor: this.props.color? this.props.color : 'rgba(255,255,255,0)', flexDirection:'row', padding:10, alignItems:"center", height:70, overflow:"hidden", borderBottomWidth:.5 }}>
            <View style={{flex:3, flexDirection:'column'}}>
                <Text style={{ fontFamily: 'advent-pro', fontSize:18 }} >{this.props.title}</Text>
                <Text style={{ fontFamily: 'advent-pro' , fontSize:14 }} >{this.props.subtitle}</Text>
            </View>
            <View style={{flex:1, flexDirection:'column'}}>
            {
                this.props.rightTitleStyle != null?(
                <Text style={this.props.rightTitleStyle} >{this.props.rightTitle}</Text>
        ):
            <Text style={{ fontFamily: 'advent-pro', fontSize:16 }} >{this.props.rightTitle}</Text>

            }
                <Text style={{ fontFamily: 'advent-pro' , fontSize:14 }} >{this.props.rightSubtitle}</Text>
            </View>
            </View>

            </TouchableOpacity>

        ) 
      }

}