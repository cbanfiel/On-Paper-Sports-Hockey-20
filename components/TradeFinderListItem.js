import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import CachedImage from './CachedImage';
import { Divider } from 'react-native-elements';
import { getDraftPickProjectedPick } from '../data/script';




export default class TradeFinderListItem extends React.Component {

    getPlayerString() {
        str = "";
        for (let i = 1; i < this.props.offer.players.length; i++) {
            let player = this.props.offer.players[i];
            if (player.isPick === true) {
                str += 'Round: ' + player.round + ' Projected Pick: ' + getDraftPickProjectedPick(player)

            } else {
                str += player.rating + " OVR " + player.positionString + " #" + player.number + " " + player.name;
            }
            if (i < this.props.offer.players.length) {
                str += "\n";
            }
        }

        return str;
    }


    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
                <View style={{ overflow: 'hidden', height: 140, borderBottomWidth: 0.5 }}>



                    <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, width: '50%', margin: 2 }}>
                        <CachedImage uri={this.props.offer.team.logoSrc} style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }} />

                        <Text style={{ textAlign: "center", fontSize: 18, color: 'black', fontFamily: 'advent-pro' }}>{this.props.offer.team.name}</Text>
                    </View>

                    {
                        <Text style={{ textAlign: "center", fontSize: 18, color: 'black', fontFamily: 'advent-pro' }}>{

                            this.props.offer.players[0].isPick === true ?
                                'Round: ' + this.props.offer.players[0].round + ' Projected Pick: ' + getDraftPickProjectedPick(this.props.offer.players[0]) :

                                this.props.offer.players[0].rating + " OVR " + this.props.offer.players[0].positionString + " #" + this.props.offer.players[0].number + " " + this.props.offer.players[0].name}</Text>
                    }


                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                            {
                                <CachedImage uri={this.props.offer.players[0].isPick === true ? 'https://on-paper-sports.s3.us-east-2.amazonaws.com/player_portraits/NBA-Player.png' : this.props.offer.players[0].faceSrc} style={{ height: 100, width: 100, resizeMode: 'contain', position: 'relative', bottom: 0 }} />
                            }

                        </View>

                        <View style={{ flex: 5, flexDirection: 'column' }}>
                            <Text style={{ textAlign: "center", fontSize: 16, color: 'black', fontFamily: 'advent-pro' }}>{this.getPlayerString()}</Text>

                        </View>

                        <View style={{ flex: 1 }}>
                            <CachedImage uri={this.props.offer.team.logoSrc} style={{ height: 85, width: 85, resizeMode: 'contain', marginTop: 15, marginLeft: 5 }} />

                        </View>


                    </View>



                </View>

            </TouchableOpacity>

        )
    }

}