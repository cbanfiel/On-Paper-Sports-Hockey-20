import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, leaugeLeaders, setSelectedTeam2, franchise, sortedRoster, conferencesOn, collegeMode, refreshOff, setRefreshOff } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';
import CachedImage from '../components/CachedImage';

export default class ResigningStage extends React.Component {

  render() {

    return (
      <Background>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>


          <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: selectedTeam, back: Actions.currentScene, view: 'resigning', forced: false }) }}>
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
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Expiring Contracts'}</Text>
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


          <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.stage = 'freeagency', franchise.simStage(), this.props.teamListStage(franchise.stage), Actions.replace('freeagencystage', { teamListStage: this.props.teamListStage }) }}>

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
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Sim To Free Agency'}</Text>
            </Card>
          </TouchableOpacity>
        </ScrollView>
      </Background>
    )
  }

}
