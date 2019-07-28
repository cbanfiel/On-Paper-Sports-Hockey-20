import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, leaugeLeaders, setSelectedTeam2, franchise, sortedRoster, conferencesOn, collegeMode, refreshOff, setRefreshOff } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';
import CachedImage from '../components/CachedImage';

export default class ResigningStage extends React.Component{

    render(){

        return (
            <Background>
              <ScrollView>
  
  
                <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: selectedTeam, back: Actions.currentScene, view: 'resigning', forced:false }) }}>
                <Card
                  containerStyle={{
                    width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                    borderRadius: 25,
                    alignSelf:'center'
                  }}
                  >
  
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }} />
                  </View>
                  <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                  <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Expiring Contracts'}</Text>
                </Card>
              </TouchableOpacity>
  
                <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: selectedTeam, back: 'seasonmenu' }) }}>
                <Card
                  containerStyle={{
                    width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                    borderRadius: 25,
                    alignSelf:'center'
                  }}
                  >
  
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }} />
                  </View>
                  <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                  <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Current Roster'}</Text>
                </Card>
              </TouchableOpacity>
  
              <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.teamlist({ home: 3, back: 'season', isForced: false, requirementsOff: true })}>
                          <Card
                              containerStyle={{
                                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                  borderRadius: 25,
                                  alignSelf:'center'
                              }}
                              >
  
                              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                  <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                              </View>
                              <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                              <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Trade'}</Text>
                          </Card>
                      </TouchableOpacity>
  
  
                <TouchableOpacity style={{ width: '100%' }} onPress={() => {franchise.stage = 'freeagency', franchise.simStage() , this.props.teamListStage(franchise.stage), Actions.replace('freeagencystage', {teamListStage: this.props.teamListStage})}}>
  
                <Card
                  containerStyle={{
                    width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                    borderRadius: 25,
                    alignSelf:'center'
                  }}
                  >
  
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{ uri: selectedTeam.logoSrc }} />
                  </View>
                  <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                  <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Sim To Free Agency'}</Text>
                </Card>
              </TouchableOpacity>
              </ScrollView>
            </Background>
          )
        }

        }
