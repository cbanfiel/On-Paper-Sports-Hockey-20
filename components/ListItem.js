import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import CachedImage from './CachedImage';




export default class ListItem extends React.Component {

    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
            <View style={{ backgroundColor: this.props.color? this.props.color : 'rgba(255,255,255,0.75)', flexDirection:'row', paddingVertical:10, alignItems:"center", height:70, overflow:"hidden", borderBottomWidth:.5 }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 50, width: 1}} uri={this.props.leftAvatar} />
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
            {
                this.props.rightAvatar!= null ?
                (
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 50, width: 1}} uri={this.props.rightAvatar} />
                ):null
            }
            </View>

            </TouchableOpacity>

        ) 
      }

}