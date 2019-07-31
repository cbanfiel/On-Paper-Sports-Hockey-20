import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import CachedImage from '../components/CachedImage';
import { Button, Card, Icon, Divider } from 'react-native-elements';
import { returnStatsView, calculateCapRoom, displaySalary, setPowerRankings } from '../data/script';
import Picache from 'picache';




export default class TeamCardModal extends Component {

    powerRanking(){
        setPowerRankings();
        return this.props.modalTeam.powerRanking;
    }



    render() {
        return (
            <ScrollView style={{flex:1, backgroundColor:'white'}}>

                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50, flex: 1 }}
                        uri={this.props.modalTeam.logoSrc} />
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro', flex: 2, textAlign: 'center' }}>{this.props.modalTeam.name}</Text>
                    <View style={{flex:1}}></View>
                </View>

                <Divider style={{ height: 1, margin: 5, backgroundColor: 'black', width: '90%', alignSelf: 'center' }}></Divider>
                <View style={{ flexDirection: 'column', padding: 10, alignItems: 'center', flex: 1 }}>
                    
                <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"OVR: " + this.props.modalTeam.rating}</Text>
                <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"CAP ROOM: $" + displaySalary(calculateCapRoom(this.props.modalTeam)) }</Text>
                <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"RECORD: " + this.props.modalTeam.wins + '-' + (this.props.modalTeam.losses-this.props.modalTeam.otLosses) + '-' + this.props.modalTeam.otLosses }</Text>
                <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"SEED: " + this.props.modalTeam.seed }</Text>
                <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"OVR RANK: " + this.powerRanking() }</Text>
                
                <Divider style={{ height: 1, margin: 5, backgroundColor: 'black', width: '90%', alignSelf: 'center' }}></Divider>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'column', alignItems: "flex-start" }}>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: this.props.modalTeam.offLine1[0].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'C #' + this.props.modalTeam.offLine1[0].number + ' ' + this.props.modalTeam.offLine1[0].name + ' OVR: ' + this.props.modalTeam.offLine1[0].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: this.props.modalTeam.offLine1[1].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'LW #' + this.props.modalTeam.offLine1[1].number + ' ' + this.props.modalTeam.offLine1[1].name + ' OVR: ' + this.props.modalTeam.offLine1[1].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: this.props.modalTeam.offLine1[2].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'RW #' + this.props.modalTeam.offLine1[2].number + ' ' + this.props.modalTeam.offLine1[2].name + ' OVR: ' + this.props.modalTeam.offLine1[2].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: this.props.modalTeam.defLine1[0].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'D #' + this.props.modalTeam.defLine1[0].number + ' ' + this.props.modalTeam.defLine1[0].name + ' OVR: ' + this.props.modalTeam.defLine1[0].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: this.props.modalTeam.defLine1[1].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'D #' + this.props.modalTeam.defLine1[1].number + ' ' + this.props.modalTeam.defLine1[1].name + ' OVR: ' + this.props.modalTeam.defLine1[1].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: this.props.modalTeam.goalies[0].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'G #' + this.props.modalTeam.goalies[0].number + ' ' + this.props.modalTeam.goalies[0].name + ' OVR: ' + this.props.modalTeam.goalies[0].rating}</Text>
                    </View>
                  </View>
                </View>



                </View>
            </ScrollView>
        );
    }
}