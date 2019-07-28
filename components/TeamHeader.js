import React from 'react';
import { Text, View } from 'react-native';
import CachedImage from './CachedImage';

export default class TeamHeader extends React.Component {

    render() {

        if(this.props.season){
            return(
<View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth:1, paddingBottom:2  }}>
                    <CachedImage
                        style={{ resizeMode:'contain', height: 50 }}
                        uri= { this.props.selectedTeam.logoSrc }/>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20}}>{this.props.selectedTeam.name}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20}}>{'Record: ' + this.props.selectedTeam.wins + '-' + this.props.selectedTeam.losses}</Text>

                </View>

            )
        }
        return (
                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth:1  }}>
                    <CachedImage
                        style={{ resizeMode:'contain', height: 50 }}
                        uri={this.props.selectedTeam.logoSrc } />
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20}}>{this.props.selectedTeam.name}</Text>
                </View>
               
        )
    }
}

