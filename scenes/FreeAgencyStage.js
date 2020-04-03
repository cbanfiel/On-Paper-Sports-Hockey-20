import React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Alert } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, leaugeLeaders, setSelectedTeam2, franchise, sortedRoster, conferencesOn, collegeMode, refreshOff, setRefreshOff, setAutoSign } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';
import CachedImage from '../components/CachedImage';

export default class FreeAgencyStage extends React.Component {




  turnOffAutoSigning = () => {
    selectedTeam.reorderLineup();

    let forwardCount = selectedTeam.offLine1.length + selectedTeam.offLine2.length + selectedTeam.offLine3.length + selectedTeam.offLine4.length;
    let defenseCount = selectedTeam.defLine1.length + selectedTeam.defLine2.length + selectedTeam.defLine3.length;
    let goalieCount = selectedTeam.goalies.length;

    if (forwardCount < 12) {
      let diff = 12 - forwardCount;
      Alert.alert('You must sign ' + diff + ' more forwards before turning off auto fill');
      return;
    }
    if (defenseCount < 6) {
      let diff = 6 - defenseCount;
      Alert.alert('You must sign ' + diff + ' more defensemen before turning off auto fill');
      return;
    }
    if (goalieCount < 2) {
      let diff = 2 - goalieCount;
      Alert.alert('You must sign ' + diff + ' more goalies before turning off auto fill');
      return;
    }

    this.setState({ autoSign: !this.state.autoSign });
  }

  state = {
    autoSign: true
  }

  render() {

    return (
      <Background>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.turnOffAutoSigning() }}>

            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.autoSign ? 'Auto Fill Roster: ON' : 'Auto Fill Roster: OFF'}</Text>
            </Card>
          </TouchableOpacity>


          <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.signplayermenu({ back: Actions.currentScene, forced: false, collegeMode: collegeMode }) }}>
            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{collegeMode ? 'Recruiting' : 'Free Agency'}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: selectedTeam, back: 'seasonmenu' }) }}>

            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Current Roster'}</Text>
            </Card>
          </TouchableOpacity>
          {
            !collegeMode ?
              <View>
                <View style={{ display: 'flex', flexDirection: 'row', width: '95%', alignSelf: 'center' }}>

                  <TouchableOpacity style={{ width: '97%', flex: 1, marginRight: '1.25%' }} onPress={() => Actions.tradefinder({ popTo: Actions.currentScene, requirementsOff: true })}>
                    <Card
                      containerStyle={{
                        width: '100%', backgroundColor: 'rgba(255,255,255,0)', alignSelf: 'center', borderColor: 'rgba(0,0,0,0.9)'
                      }}
                    >

                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
                      </View>
                      <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Trade Finder'}</Text>
                    </Card>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ width: '97%', flex: 1, marginLeft: '1.25%' }} onPress={() => Actions.teamlist({ home: 3, back: 'season', isForced: false, requirementsOff: true })}>
                    <Card
                      containerStyle={{
                        width: '100%', backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: 'black',
                        alignSelf: 'center'
                      }}
                    >

                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
                      </View>
                      <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Trade'}</Text>
                    </Card>
                  </TouchableOpacity>
                </View>
              </View>
              : null
          }


          <TouchableOpacity style={{ width: '100%' }} onPress={() => { setAutoSign(this.state.autoSign), franchise.stage = "freeagencyend", franchise.simStage(), this.props.teamListStage(franchise.stage), Actions.replace('trainingstage', { teamListStage: this.props.teamListStage }) }}>

            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Advance To Training'}</Text>
            </Card>
          </TouchableOpacity>

        </ScrollView>
      </Background>
    )
  }

}
