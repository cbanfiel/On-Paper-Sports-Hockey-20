import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import CachedImage from './CachedImage';
import { Divider } from 'react-native-elements';




export default class StatListItem extends React.Component {

    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
                <View style={{overflow:'hidden', height:140, borderBottomWidth:0.5}}>


                    
                <View style={{display: 'flex', flexDirection: 'row', alignSelf:'center', justifyContent: 'center', alignItems: 'center', borderBottomWidth:1, width:'50%', margin:2 }}>
                    {
                        this.props.teamLogoSrc!=null?(
                        <CachedImage uri={this.props.teamLogoSrc} style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }} />
                        ):null

                    }
                            <Text style={{ textAlign: "center", fontSize: 18, color: 'black', fontFamily: 'advent-pro' }}>{this.props.teamName}</Text>
                        </View>
                        <Text style={{ textAlign: "center", fontSize: 18, color: 'black', fontFamily: 'advent-pro' }}>{this.props.playerInfo}</Text>




                        <View style={{flexDirection:'row'}}>

                <View style={{flex:1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <CachedImage uri={this.props.faceSrc} style={{ height: 100, width: 100, resizeMode: 'contain',marginRight:5 }} />

            </View>

            <View style={{flex:5, flexDirection:'column'}}>
            <Text style={{ textAlign: "center", fontSize: 16, color: 'black', fontFamily: 'advent-pro' }}>{this.props.stats}</Text>

                        </View>

                        <View style={{flex:1}}>
                        <CachedImage uri={this.props.teamLogoSrc} style={{ height: 85, width: 85, resizeMode: 'contain', marginTop:15, marginLeft:5  }} />

                            </View>


            </View>


           
                </View>

            </TouchableOpacity>

        ) 
      }

}